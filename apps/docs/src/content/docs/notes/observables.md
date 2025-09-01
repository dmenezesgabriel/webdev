---
title: "Observables and rxjs"
description: "Learn about Observables and rxjs in Angular"
---

## Observables

It is a concept introduced by RxJS library to handle asynchronous data streams

## Signals vs Observables

- Observables are values over time, while signals are values in a container that don't need a subscription to be accessed
- With signals, rxjs is not required anymore for reactivity, but since signals are a new concept from version 17 of Angular, you may see a lot of legacy code using observables
- Rxjs Observables can be less verbose than signals when dealing with complex data transformations and operators, for example when using operators like `map`, `filter`, `switchMap`, `debounceTime`, etc.
- Observables are great for managing events and streamed data whereas signals are better suited for managing application state
- Signals can be converted to observables using `toObservable()` and observables can be converted to signals using `toSignal()`
- Observables have no initial value, whereas signals always have an initial value
