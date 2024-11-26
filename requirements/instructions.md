# Fever Diary Web App

## Project Overview

Fever Diary is a handy web app that lets you log your temperature and keep track of any fever meds you or your loved ones take when someone gets sick with a fever.

The app is built in TypeScript, React, Lucide, TailwindCSS, Zustand, Tanstack Router, Tanstack Query, Tanstack Table, react-hook-form, zod and Clerk.io.

## Functional Requirements

1. Header:

   - The app is to have a header with a logo + title on the left hand side, bound to the maximum width of the app's layout.
   - The title should be "Fever Diary"
   - The logo should be a thermometer icon

2. Welcome screen:

   - Route:
     - Should live under the `/welcome` path
     - User who has no persons created, and navigates to the root path, should be redirected to the welcome screen
   - UI:
     1. Display a message to the user, which explains that the user can start adding fever entries right away, but to share the data across devices, the user should create an account.
     2. Below the message display two buttons: "Continue without account" as primary button and "Create account" as secondary button.
     3. Below the buttons display a hyperlink to the log-in screen (`/login`).
   - Clicking the "Continue without account" button, brings the user to the fever diary entry form (`/entry/new`).
   - Clicking the "Create account" button, brings the user to the sign-up/sign-in screen.

3. Fever diary entry form:

   - Route:
     - For new entry should live under the `/entry/new` path
     - For modifying an already existing entry, the path would be redirected to the `/entry/$entryId` path
   - UI:
     - Built using react-hook-form and zod for validation.
     - Common form for new and existing entries:
       1. Input field for the date and time of the entry.
       2. Input field for the person name.
       3. Input field for the temperature reading.
       4. Select input field for the medication type.
       5. Input field for the medication dosage.
       6. Submit button.
     - Input field for the person name:
       - The input value should be required.
       - Should be a dropdown, with the list of all persons created by the user.
       - The user can type in the input field, to search for a person.
       - If the user types in a name, that does not match any of the existing persons, the dropdown should display a "Create <Name>" option. Clicking the option, should create the person with the given name. Hitting the "Enter" key, should have the same effect.
     - Input field for the temperature reading:
       - The input value should be required, only if the user has not selected a medication type.
       - Message to the user, if the input value is required, but missing: "Temperature or medication is required"
       - Utilize the components/ui/input component.
       - Should be a number input field, with a unit suffix "°C".
     - Input field for the medication type:
       - The input value should be required.
       - Utilize the components/ui/select component.
       - Should be a dropdown, with the list of all medication types.
     - Input field for the medication dosage:
       - The input value should be required, only if the user has not selected a medication type.
       - Message to the user, if the input value is required, but missing: "Temperature or medication is required"
       - Should be a number input field, with a unit suffix "mg".
     - Submit button:
       - For new entry, the button should read "Add entry"
       - For modifying an already existing entry, the button should read "Update entry"
     - On submit:
       - Store the data in indexedDB.
       - Redirect the user to the diary screen for the person, to which the entry was added.

4. Diary screen:

- Route:
  - Should live under the `/diary` path
  - User who already has fever diary entries created, and navigates to the root path, should be redirected to the diary screen
  - User who navigates to the `/diary` path, but has no persons created, should be redirected to the `/welcome` screen
- UI:
  - Main screen should display the diary entries for all persons
-
- When a user navigates to the root path, and there are no persons created, the user is redirected to the welcome screen.
- Display diary entries for the selected person
  - Descending order by timestamp
- Above the diary entries, display the person icon, name, button to edit the person and button to change the selected person if there is more than one person created
  - On change button click, display a modal dialog with a list of all persons, so that the user can select the person for which the diary entries are being displayed.
- Below the person selector row, display the icon
- Display always visible CTA button to add a new diary entry
  - Place the button in the bottom center of the screen, so that it is always in the viewport

5. Log-in screen

6. There should be a quick way to create a new person, via entering the name in an input field. If the name exists, the user should be able to select the existing person from the list of persons. If the name does not exist, the user should be able to create the person by pressing a "Create" button. Toast notifications should be used to notify the user of the outcome of the operation.

- Person should store:
  - Name (required)
  - Date of birth (not required)
  - Weight (not required)
- It is required to provide person reference, and either the temperature reading, or medication type + medication dosage.
- Once a fever diary entry is created, the user should be redirected to the main fever diary screen, with the filter for the person that was just created.
- The main screen should have a filter for each person, so that the user can view the fever diary entries for a specific person.
- The main screen should have a button to add a new person. The button should be located in the bottom center of the screen. Always in the viewport.

## Non-functional Requirements

- Data is to be stored locally, on the device, using indexedDB.
- The schema of the tables should be as follows:
  - Person table:
    - id
    - name
    - dateOfBirth
    - weight
  - Fever diary entry table:
    - id
    - personId
    - timestamp
    - temperatureCelsius
    - medicationType
    - medicationDosage
- The app should be functional in offline mode (PWA).
- The app is to be designed with mobile use in mind.
- The app should be built using React, with TypeScript and TailwindCSS.
- The account creation should be built using Clerk.io.
- The app backend for signed in users will be built in a separate repository. Feel free to suggest endpoints and data models.

## File Structure

## Docs

### How to create a new file based routes with Tanstack Router

```TS
// src/routes/post.$postId.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/post/$postId')({
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  return <div>Post ID: {postId}</div>;
}
```

### How to query indexedDB with Tanstack Query

```TS
import FeverDiaryIDBClient from "@/db/client";
import { useQuery } from "@tanstack/react-query";

const useDiaryEntries = (personId: string) => {
  return useQuery({
    queryKey: ["fever-diary-entries", personId],
    queryFn: () => {
      const client = FeverDiaryIDBClient.getInstance();
      return client.getEntriesByPerson(personId);
    },
  });
};

export default useDiaryEntries;

```
