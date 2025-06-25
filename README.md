# Pokemon Battle App

## Project Setup and Running Locally

### Prerequisites

- Node.js and npm installed
- Access to the GitHub repository: [https://github.com/nasserallah-hourichi/pokemon](https://github.com/nasserallah-hourichi/pokemon)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/nasserallah-hourichi/pokemon.git
   cd pokemon/frontend
2. Create a .env file in the root of the /frontend directory.

3. Add the following environment variables to the .env file:

REACT_APP_SUPABASE_URL=https://yjxfabugdqviiphcutij.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqeGZhYnVnZHF2aWlwaGN1dGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDY0NjAsImV4cCI6MjA2NjQyMjQ2MH0.Gi0yMqEY-Cb6VjG8FrMNojARxCXbGz0NOMdznEVmIWQ

4. Install dependencies:
npm install

5. Start the development server:
npm start

6. Open your browser and navigate to http://localhost:3000.

## Explanation of Data Structure, Schema, and Algorithm Choices
# Data Structure & Schema:

Pokémon are represented with a PokemonModel interface that includes essential fields such as id, name, life, power, and type (represented as a string name).

Teams are arrays of Pokémon, supporting up to 6 members.

This structure mirrors the core domain objects and allows straightforward mapping between UI and backend data.

# Algorithm:

The battle logic uses a turn-based round system where each Pokémon attacks once per round.

Damage is calculated factoring in type effectiveness based on a defined matrix (e.g., Fire is weak against Water).

The battle continues until one team is fully defeated.

This approach simulates traditional Pokémon battle mechanics while keeping computations simple and maintainable.

# State Management:

The project intentionally avoids complex state management libraries to reduce bloatware and keep the application lightweight.

Instead, battle state is encapsulated and managed inside a dedicated BattleService class.

This allows clean separation of concerns and easier debugging, especially for an interview/demo project.

