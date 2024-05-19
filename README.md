# EmpathySurveyBuilder

## Run the project

### Deployed version

You can access a deployed version of the project in the following URL.

[https://main--empathy-survey-builder.netlify.app/#/](https://main--empathy-survey-builder.netlify.app/#/)

### Local version

If you prefer to run the project locally, you just need to install all the dependencies with `npm install` and then run `npm run start`.

This will start the application on your localhost on port 4200.

## Architecture

The architectural patterns that have influenced the creation of this solution are mainly three:

- Smart & Dumb components pattern.
- Folder organization suggested by [Tomas Trajan](https://x.com/tomastrajan) in his book [Angular Enterprise Architecture](https://angularexperts.io/products/ebook-angular-enterprise-architecture).
- File-based routing, similar to the [App Router](https://nextjs.org/docs/app) in Next.js.

### Smart & Dumb Components

You can find two types of components in this application: smart components and dumb components.

#### Smart Components (Container Components)

Smart components, also known as container components, are mainly pages that "know" the rest of the parts of the application. Their responsibilities are to inject global services, manage state, manage data streams, connect dumb components, etc.

#### Dumb Components (Presentational Components)

Dumb components, also known as presentational components, are the most basic UI building blocks of the application. They don't "know" anything about the rest of the application and they communicate with the parent components via `inputs` and `outputs`. Their main responsibilities are to present data, collect user data, interact with users, etc.

### Folder Structure

There are five main folders defined in the architecture proposed by Tomas Trajan (only four are used in this application):

- **core**: Global tools used across the entire application (services, interceptors, types, etc.). Organized by domains and common features.
- **features**: Smart components of the application, representing the pages of the application.
- **layout**: Components related to different layouts.
- **ui**: Dumb components shared across the entire application.
- **pattern**: Smart components shared across the entire application. This folder is missing in this application as it's not necessary.

### File-based routing

Just like in Next.js applications, the code inside the **feature** folder is organized as you access it in the browser. Inside each feature, you will find:

- **\*.routes.ts** file with all the routes and child routes of the feature.
- **Smart component** representing the feature.
- **Folders prefixed with underscore '\_'** to colocate feature-related code. The most common folders for this type of architecture are:
  - **\_ui**: Dumb components.
  - **\_pattern**: Smart components.
  - **\_state**: Local state services or stores.

## Use Case

For this use case, it was requested to implement some sort of "Survey Builder" to replace Microsoft Word as the main tool for designing future surveys.

Having customized tools like this one has a very high value because they can significantly reduce the time invested in creating surveys. They can also be extended to provide unique features, such as a shareable workspace where an entire team can modify and work together to design surveys. Additionally, this tool can help the team to clarify the information presented, improving the overall workflow.

The provided solution consists of a provisional dashboard where you can access a list of created surveys. From there, you can access individual surveys and be redirected to a page that implements the desired feature. On this page, you can add and modify questions that will form the survey.

## Assumptions

- The main focus of the project has been the **Survey Builder**, which means that the Dashboard is not as cool as the main feature. It's just a list of surveys where you can access the main feature.

- One of the requirements was marked as: "For each question, the user can type the options that will be available. Each option would begin with a hyphen." This has not been implemented literally, as I believe the solution that has been implemented instead is more powerful for the future. A WYSIWYG editor has been embedded ([editorjs](https://editorjs.io/)) that allows you not only to embed lists with options, but also to extend it with modules to embed other items like images, multi-select lists, checkboxes, etc.

- Another requirement was "The script should be saved every time the user adds a new question". If I understand correctly, this says that the script should be saved every time a user clicks the "Add a question" button. However, in this case, I can add a question by clicking the button, fill out the question, leave the page, and lose the data on the filled question as the script only gets saved when adding a new empty question. To solve this, I have implemented that the script is saved when adding a new question, and it will also save the whole script every time any question value changes. To avoid making a new request every time the user types a character in the text editor, I have added a debounce time of 500ms, so the script is only saved when the user stops typing for 500ms.

- As this is just some sort of trial with limited time, there are some things that has not been implemented in the right way. For example, some reusable dumb components like buttons or combobox dropdowns are not fully generic, some custom form inputs don't implement interesting interfaces like `ControlValueAccessor` to make them compatible with `ReactiveForms`, not all the code is tested as it would require a lot of time, some components don't implement animations, there are no loading screens...

- The Figma design has been followed in a strict way, but I have found some measures don't match as they should. Most of the cases are variations of 1 or 2 pixels that I have corrected on the implementation, but there is a case where is a mismatch. I'm talking about the question type dropwdown, the opened component has a fixed with of `256px`, but the button has a different width. I know that usually this is not controlled in other component libraries, but it seems strange to not be the same width for this specific design. In the end I implemented what it's on the Figma file as otherwhise the 'Multiple choice' option wraps.

- I have used Tailwindcss to implement this as it was the quickest way to start working, but for the real project defining a CSS Architecture could be a good idea.

## Suggestions

The project seems so powerfull and while I was implementing it I had a lot of ideas that can really improve it a lot more.

- Delete button for a question.
- (Implemented) WYSIWYG editor to allow a better representation of complex questions.
- Sharable workspace where a team can access the survey and modify it in real time.
- Component library / Monorepo with a components lib to share basic ui building blocks.
- Resposive design to allow users to access from mobile (partially implemented, fluid design has been implemented).
- Accesibility attributes to allow tabbing between elements.
- Shortcuts to trigger actions: some pages allow you to hit `CTRL+K` to focus on searchbar, this can be useful for creating questions or triggering other actions.
