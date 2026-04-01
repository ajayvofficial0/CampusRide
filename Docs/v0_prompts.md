# Helpful Prompts for v0.dev (vzero)

Since you are designing the UI in v0, here are some tailored prompts you can use to generate components that fit perfectly with the backend we just built.

## 1. Main Ride Feed (Uber Style)
**Prompt:**
> Design a mobile-first college carpool app "Ride Feed" screen.
> *   **Header**: "Campus Rides" with a user profile avatar.
> *   **Search**: "Where to?" input field.
> *   **Ride List**: A vertical list of ride cards. Each card must show:
>     *   Driver Name & Department (e.g. "Ajay, CS 3rd Year")
>     *   Vehicle Model (e.g. "Swift Dezire")
>     *   Origin -> Destination (with an arrow icon)
>     *   Departure Time (e.g. "8:30 AM Today")
>     *   Price per Seat (e.g. "₹40")
>     *   "Book Seat" button.
> *   **Style**: Modern, clean, "Uber-like" aesthetic. Use vibrant accents (blue/purple).

## 2. Post a Ride Form (Driver)
**Prompt:**
> Design a form for a student driver to "Post a Ride".
> *   **Inputs**:
>     *   Origin (Text)
>     *   Destination (Text)
>     *   Departure Time (Datetime picker)
>     *   Vehicle Selection (Dropdown: "Swift - KA05...", "Bike - KA01...")
>     *   Seat Price (Number input)
> *   **Action**: A large "Publish Ride" button at the bottom.

## 3. Login Screen
**Prompt:**
> Design a simple Login/Register screen for verified college students.
> *   **Tabs**: Login / Register.
> *   **Fields**: Email, Password. + (For Register) Name, Department.
> *   **Visuals**: "University Carpool" branding, maybe a background illustrations of students or cars.

---

**Tip**: After generating, ask v0 to "Convert this to a single React component using Tailwind CSS and Lucide Icons". Then copy the code here!
