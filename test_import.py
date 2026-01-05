try:
    from langchain_community.utilities.dalle_image_generator import DallEAPIWrapper
    print("SUCCESS: Imported DallEAPIWrapper from langchain_community")
except ImportError as e:
    print(f"FAILURE: {e}")

try:
    from langchain_openai import ChatOpenAI
    print("SUCCESS: Imported ChatOpenAI from langchain_openai")
except ImportError as e:
    print(f"FAILURE: {e}")
