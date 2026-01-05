from typing import TypedDict, Optional, List
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field
import os

# --- Data Models ---
class Exercise(BaseModel):
    name: str = Field(description="Name of the exercise")
    sets_reps: str = Field(description="Sets and Reps (e.g., '3 sets of 12 reps')")
    youtube_url: str = Field(description="YouTube search URL for the exercise")
    form_tip: str = Field(description="2-3 sentence guide on proper form and technique")

class DailyRoutine(BaseModel):
    day: str = Field(description="Day name (e.g., 'Day 1: Chest & Triceps')")
    exercises: List[Exercise] = Field(description="List of exercises for this day")

class WeeklyRoutine(BaseModel):
    days: List[DailyRoutine] = Field(description="7 days of workout routines")

# --- Agent State ---
class AgentState(TypedDict):
    age: int
    weight: float
    height: float
    level: str
    tenure: str
    routine: Optional[WeeklyRoutine] # Now using the Pydantic model
    model_provider: str

# --- Prompts ---
ROUTINE_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are an expert fitness trainer. You create personalized 7-day gym routines."),
    ("user", """
    Create a detailed one-week gym routine for a user with the following profile:
    - Age: {age}
    - Weight: {weight} kg
    - Height: {height} cm
    - Experience Level: {level} (Beginner, Regular, Expert)
    - Gym Tenure: {tenure}
    
    Structure the response as a weekly plan. For each exercise, include a YouTube search URL and a "form_tip" describing how to do it correctly.
    """)
])

def generate_routine(state: AgentState):
    """Node to generate the gym routine."""
    provider = state.get("model_provider", "Anthropic")
    
    # Select Model
    if provider == "OpenAI":
        if not os.environ.get("OPENAI_API_KEY"):
             # Return empty/error structure implicitly handled by UI error check or modify state to have error field
             # For now, we will raise an error that will be caught in app.py or handle gracefully?
             # Let's return None and handled in UI.
             return {"routine": None}
        llm = ChatOpenAI(model="gpt-4o", temperature=0.7)
    else:
        if not os.environ.get("ANTHROPIC_API_KEY"):
             return {"routine": None}
        llm = ChatAnthropic(model="claude-3-5-sonnet-latest", temperature=0.7)

    # Bind Structured Output
    structured_llm = llm.with_structured_output(WeeklyRoutine)
    chain = ROUTINE_PROMPT | structured_llm
    
    response = chain.invoke({
        "age": state["age"],
        "weight": state["weight"],
        "height": state["height"],
        "level": state["level"],
        "tenure": state["tenure"]
    })
    
    return {"routine": response}

# Build the Graph
workflow = StateGraph(AgentState)

workflow.add_node("generate", generate_routine)
workflow.set_entry_point("generate")
workflow.add_edge("generate", END)

# Compile
app_graph = workflow.compile()
