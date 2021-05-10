---
sidebar_position: 3
---

# Validation

Model validation comes built-in with our data layer. Before every create or update operation, the model will be automatically validated. By default, we use [FluentValidation](https://fluentvalidation.net/) to validate the models, but you can also choose to use your own custom validation logic.

> TODO: Document validation order

## Using FluentValidation

The recommended way of dealing with validation is using [FluentValidation](https://fluentvalidation.net/) rules. Each model, gets its own validator.

### Create a validator

By default, a validator for a model covers **Create** and **Update** operations, but you can also [validate other scenarios](#validate-other-scenarios).

> TODO

### Validate other scenarios

> TODO: Create scenario Enum, Implement Scenario, Call Create or Update operation and pass enum

## Using a custom implementation
