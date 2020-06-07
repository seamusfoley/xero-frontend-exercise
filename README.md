- [Introduction](#introduction)
- [Getting started](#getting-started)
- [Approach](#approach)
  - [Research](#research)
  - [TypeScript](#typescript)
  - [Structure](#structure)
- [Making it Production Ready](#making-it-production-ready)
  - [Validation](#validation)
  - [Editing/Clearing](#editingclearing)
  - [Server Sync](#server-sync)
  - [Testing](#testing)
  - [Accessibility](#accessibility)
  - [Component Styling](#component-styling)
  - [External dependencies](#external-dependencies)
  - [Responsiveness](#responsiveness)
- [Thanks](#thanks)
- [Bonus](#bonus)

# Introduction

Thank you for the opportunity to complete the pre-interview task! It was a lot of fun.

To be honest this has taken me longer than the 45 mins suggested time coding. The actual logic to do the Add Item, Cost Addition and Submission parts was about an hour, but then there was the research, typing, styling and ‘component-ising’; that added to the time. This example I have put together is possibly over-engineered for the brief, but it shows some of how I think about developing in React, and how I approach writing something robust and maintainable for production.

# Getting started

You can run the example by using `npm start` at the project root and it will start at  `localhost:3000`. The front end is also deployed here xero-frontend-exercise.seamusfoley.now.sh

# Approach

## Research 

I had a close look at the source for the modern Xero invoicing interface to build this, both to understand how it is built and to make sure I had understood correctly what an invoice interface is supposed to do! As you will see, I ended up copying the ```xui.min.css``` into the project to assist the styling. 

## TypeScript

I have used TypeScript for this project. For the last couple of years I have found myself reaching for TypeScript by default, even for small projects. It is slower to write and can be harder to read, but I find it helps me be more sure that what I'm writing is correct. I find the typings are particularly useful when my teammates (and my future self!) want to reuse components or utilities.

## Structure

Having done a fair bit with Redux pre 'useContext' I still generally follow the pattern of handling  state in a 'container' component, and the 'presentation' components as pure as possible. I tend to establish this pattern pretty early on, because you never know when you're going to have to reuse a component and it can be really tricky to strip out even apparently simple state later. For the same reason, even with useContext, I still am happy to prop drill a few levels so the child components remain self contained.

In this example I have used the App component as the container and the Invoice, and InvoiceInput as the presentation components.

# Making it Production Ready

## Validation

Currently you can create a Line Item with missing fields, and submit an empty invoice. There should be checking with user prompts to make the form more usable.

Additionally, the form checking in this case should not solely rely on the client, and the front end needs to be able to handle a server side validation rejection.  

## Editing/Clearing

The Line Items are uneditable and the form is unable to be cleared so once you've added a Line Item you're committed to submitting it

## Server Sync

At the moment, nothing 'goes to the server' until the submit is pressed. Ideally you would want to be able to save a draft, or better auto-save on key user actions, such as adding a line item.

## Testing

Both unit tests and integration test are needed. Unit tests to make sure the columns are calculating correctly and the components are rendering correctly, and integration tests between the container and presentation components.   

## Accessibility

I have not checked that screen readers or other assistive devices can traverse the page correctly. There are some nods to accessibility in the code, but I suspect there would be some issues in use.

## Component Styling

Most of the components are currently dependent on the invoice specific css in index.css. This limits the reusability of the components in other contexts. There are solutions like css modules or styled components which could improve component encapsulation. 

The value of this is debatable though. I think these libraries can sometimes introduce complexity for limited return, so it depends on what one is building and the product as a whole as to whether strict encapsulation is a good approach

## External dependencies

~~I have used classNames as an external dependency in this case. In production I would be very wary of introducing a dependency like this, (even though classNames is well supported and in the official react docs) unless it was agreed practise with my teammates.~~

_As I was writing this I realised it was quicker just to take the dependency out than to write the explanation!_

## Responsiveness

The form is semi-responsive as long as you don't try to buy anything too expensive!… then it gets pretty hard to read on phone screens. This would need to be handled better in production.

# Thanks

Thanks again for the opportunity!

# Bonus

I've had a bit of time over the weekend, so I've adapted a validation method from previous experiment and popped it on the develop branch. It is deployed here https://xero-frontend-exercise-git-develop.seamusfoley.now.sh/
