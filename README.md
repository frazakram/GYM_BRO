# GymBro AI 💪

An AI-powered gym routine generator that creates personalized weekly workout plans based on your fitness profile. Built with Streamlit and powered by advanced AI models (Anthropic Claude or OpenAI GPT).

## Features

- 🤖 **AI-Powered Routines**: Generate personalized weekly workout plans using Claude or GPT-4
- 👤 **User Profiles**: Create and manage your fitness profile (age, weight, height, experience level)
- 🔐 **Secure Authentication**: User registration and login system with encrypted passwords
- 📋 **Detailed Exercise Plans**: Get comprehensive exercises with sets, reps, and YouTube tutorial links
- 📖 **Form Guides**: Learn proper exercise technique with AI-generated form tips
- 🎨 **Modern UI**: Clean, dark-themed interface optimized for user experience

## Prerequisites

- Python 3.8 or higher
- API key from either:
  - [Anthropic](https://www.anthropic.com/) (for Claude)
  - [OpenAI](https://openai.com/) (for GPT-4)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd new_pj
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv myenv
   source myenv/bin/activate  # On Windows: myenv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

You'll need to provide your API key through the application sidebar when running the app. Choose your preferred AI provider:
- **Anthropic**: Enter your Anthropic API key
- **OpenAI**: Enter your OpenAI API key

> ⚠️ **Security Note**: Never commit API keys to version control. The `.gitignore` file is configured to exclude sensitive files.

## Usage

1. **Start the application**
   ```bash
   streamlit run app.py
   ```

2. **Create an account**
   - Register with a username and password
   - Login with your credentials

3. **Set up your profile**
   - Enter your age, weight, height
   - Select your experience level (Beginner/Regular/Expert)
   - Specify your training tenure

4. **Generate your routine**
   - Navigate to the "My Routine" tab
   - Enter your API key in the sidebar
   - Click "Generate New Routine ✨"
   - View your personalized weekly workout plan with exercises, sets/reps, and tutorial links

## Project Structure

```
new_pj/
├── app.py              # Main Streamlit application
├── agent.py            # AI agent logic and LangGraph workflow
├── database.py         # Database operations and user management
├── requirements.txt    # Python dependencies
├── gym_buddy.db        # SQLite database (auto-created)
└── README.md          # This file
```

## Technologies Used

- **Frontend**: [Streamlit](https://streamlit.io/)
- **AI Framework**: [LangChain](https://www.langchain.com/) + [LangGraph](https://www.langchain.com/langgraph)
- **AI Models**: Anthropic Claude / OpenAI GPT-4
- **Database**: SQLite with bcrypt password hashing
- **Data Validation**: Pydantic

## Database Schema

The application uses SQLite with two main tables:
- **users**: Stores user authentication data
- **profiles**: Stores user fitness profiles

## Security

- Passwords are hashed using bcrypt
- API keys are entered through the UI and not stored
- Sensitive files are excluded via `.gitignore`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](#) file for details.

## Troubleshooting

### Installation Issues
- Ensure Python 3.8+ is installed: `python --version`
- Try upgrading pip: `pip install --upgrade pip`

### API Key Errors
- Verify your API key is valid and has sufficient credits
- Ensure you've selected the correct provider in the sidebar

### Database Issues
- Delete `gym_buddy.db` to reset the database
- The database will be recreated automatically on next run

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Built with ❤️ using Streamlit and AI
