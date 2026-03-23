# Plan Action

Run the write-a-prd interview flow to define a feature, then save the PRD to `context/features/`.
The user will then run `/feature load {feature-slug}` to pull it into the active workflow.

Use the "initial spec file" after plan in $ARGUMENTS as an initial specification for the feature to implement. If it exists, the final PRD should override the original file in place. If a better filename is chosen, delete the original file and create the new one.

When asking questions, ask a single question at a time. **Display the question number next to each question** (e.g., "**Q1:** ...", "**Q2:** ...").

## Steps

1. **Interview** — Ask the user for a detailed description of the feature they want to build and any solution ideas they have in mind. If an initial spec file is provided, read it and use it as context — but still ask clarifying questions before writing anything. **IMPORTANT: Always ask exactly ONE question at a time.** Number each question (Q1, Q2, Q3...). Wait for the user's response before asking the next question. Never batch multiple questions into a single message.

2. **Explore** — Explore the codebase to understand the current state relevant to this feature if needed. Verify any assumptions the user made.

3. **Clarify** — Interview the user about every aspect of the plan: scope, edge cases, UI/UX decisions, data model changes, API contracts, and constraints. Resolve each branch of the decision tree one at a time before moving on. Always do this even if a spec file was provided — the spec is a starting point, not a final answer. **IMPORTANT: Ask exactly ONE question per message.** Number each question continuing the sequence. Wait for the answer before proceeding to the next question.

4. **Design modules** — Sketch the major modules to build or modify. Prefer deep modules (rich functionality, simple interface). Confirm with the user which modules to build and which to test.

5. **Write the PRD** — Using the template below, produce a complete PRD. If an initial spec file was provided, overwrite it (or delete it and create a new file if the name changed). Otherwise write to `context/features/{feature-slug}.md`.