# 📋 Game Design Document: Family Super Olympics

## 1. General Objective
An interactive family quiz game based on competition between teams (each team consists of a child and an adult). The goal is to break routine while combining learning, entertainment, and physical activity.

**Note:**  
تم تصميم اللعبة لتكون بالكامل باللغة العربية (واجهة المستخدم، الأسئلة، والتعليمات).

---

## 2. Game Flow (User Journey)

### 2.1 Setup Screen
- Input fields for:
  - "Young Champion" name  
  - "Adult Assistant" name  
- **Add Team** button: saves the entered names into a temporary list  
- Display of added teams below the input fields  
- **Start Competition** button (appears only after adding at least two teams)  
- **Reset** button: clears all data and restarts from scratch  

---

### 2.2 Main Menu
- **Scoreboard Bar**: displays team rankings based on current points  
- **Categories Grid**: buttons representing question categories:
  - Religion  
  - Science  
  - Mathematics  
  - Physical Challenge  
  - General Knowledge  
- **Smart Counter**: shows the number of remaining questions in each category (to prevent repetition)

---

### 2.3 Challenge Screen (Game Loop)
Each category consists of **5 rounds per team**, including:

- **Round Info**:  
  Current team name + round number (e.g., 1/5)

#### Joker System
- Available **once per team per category**  
- When activated:
  - Correct answer = **10 points** (instead of 5)  
  - Wrong answer = **–5 points**

#### Child Question Card
- Displays the question text  
- Manual timer (60 seconds), starts only when the host presses start  
- **Reveal Answer** button  
- Evaluation buttons: ✅ Correct / ❌ Wrong  

#### Adult Question Card
- Same specifications as the child card  
- Separate timer  

#### Navigation
- **Next** button:
  - Saves results  
  - Moves to next round or next team  

---

## 3. Technical Logic & Rules

### Anti-Duplication System
Use a method like *(array splice or removal)* to delete each question from the database immediately after it appears, ensuring no repetition during the session.

### Independent Timer Control
The timer must be manually triggered for each player to allow the host to read the question clearly before countdown begins.

### Category Completion
- After 5 rounds:
  - Display **"Category Champion"** message  
  - Automatically return to the main menu  
  - Update scores  

### Responsiveness
The design must work smoothly on mobile and tablets:
- Large buttons  
- Clear readable text  

---

## 4. Question Bank Requirements

Each category must contain **at least 50 questions**, divided between child and adult questions:

- **Religion**: biographies, prophet stories, simple jurisprudence  
- **Science**: animals, planets, human body  
- **Mathematics**: calculations, logic, problem-solving  
- **Physical Challenge**: fun physical tasks (sound imitation, exercises)  
- **General Knowledge**: capitals, inventors, geography  

---

## 5. Required Visual Enhancements

- Timer changes to **red** when 10 seconds remain  
- Encouraging **pop-up messages** for correct answers  
- Color coding:
  - Red for child  
  - Blue for adult  