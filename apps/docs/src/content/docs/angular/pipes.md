---
title: "Pipes"
description: "Learn about Pipes in Angular"
---

## Tap

Think of `pipe` as a _side effect_ operator. It allows you to peak into a stream of data flowing through a pipe without changing it. It's like a spy in the observable chain, it cans e every value that passes by and perform an action, but it can't modify the value itself.

### Purpose

To perform side effects, such as logging,updating a separated state, or triggering other actions that don't need to alter the data stream

### Common Use Cases

Debugging. You can place `tap(data => console.log(data))` anywhere in a complex pipe to see what datais being emitted at that specific point. It's also used for things like showing or hiding a loading spinner or calling a non-reactive service method

The `tap` operator returns an observable **identical** to the one ir received. The stream of data remains completely unchanged

## Take

The take pipe is a filtering operator that limits the number of values an observable can emit. It's a way to tell an observable, "I only want the first X values, and then you can stop."

### Purpose

To automatically unsubscribe from an observable after it has emitted a specific number of values.

### Common Use Cases

It's often used with long-lived or infinite observables (Like a BehaviorSubject or even an event stream) when you only need a single value.

After the specified number of values have been emitted, `take` automatically **completes** the observable and unsubscribes from the source. This is crucial for preventing memory leaks in your application.

## Async

The `async` pipe is an Angular-specific template pipe. It is designed to solve the problem of manually subscribing to and unsubscribing from observables in your components.

### Purpose

To automatically manage the subscription of an observable or a Promise directly within your component's template.

### Common Use Cases

When you have a component property that is an observable (e.g., user$), you can use the `async` pipe in the template to display its value and have Angular to handle all boilerplate.

The `async` pipe handles three essential tasks for you:

1. Subscription: It subscribes to the observable and gets the last emitted value.
2. Unwrapping: It provides the raw data to the template for the display.
3. Unsubscription: When the component is destroyed, it automatically unsubscribes, preventing memory leaks without you writing any code in `ngOnDestroy`.

## Map

The `map` pipe is used to change the format or content of the data as it flows through the observable pipeline. It receives a value from the observable and a function you provide. This function returns a new value, and that's what the `map` operator emits to the next step in the pipeline. The original data is not altered; `map` simply creates a new, transformed value.

### Purpose

To transform data from one shape to another.

### Common Use Cases

API data shaping, an API might return a deeply nested object like `{ data: { user: { name: 'John Doe' } } }`. You can use `map` to pluck out just the user's name, so the next operator in the pipe only sees `"John Doe"`.

You can also use `map` to convert a value from one unit to another, like converting an array of temperatures from Celsius to Fahrenheit.
