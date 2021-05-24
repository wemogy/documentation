---
sidebar_position: 3
---

# Validation

Model validation comes built-in with our data layer. Before each create or update operation, the model will be automatically validated. By default, we use an `AbstractModelValidator<T>` to validate the models, but you can also choose to use your own custom validation logic.

## Validate with a Model Validator

The recommended way of dealing with validation is creating an `AbstractModelValidator<T>` for each model class. To describe validation rules, we use [FluentValidation](https://fluentvalidation.net/) rules.

### Create a validator

Add the [Wemogy.Core NuGet package](https://github.com/wemogy/libs/packages/737893) to your project.

```bash
dotnet add package Wemogy.Core
```

Create a validator class, that inherits from `AbstractModelValidator<T>`.

```csharp
public class MyModelValidator : AbstractModelValidator<MyModel>
{
    protected override void CreateValidationRules()
    {

    }

    protected override void UpdateValidationRules(MyModel existing)
    {

    }
}
```

### Add validation rules

By default, a validator covers **Create** and **Update** operations, but you can also [validate other scenarios](#advanced-validation-scenarios). To define one or many validation rules, add a [FluentValidation rule](https://docs.fluentvalidation.net/en/latest/start.html#) to the `CreateValidationRules` or `UpdateValidationRules` method.

```csharp
public class MyModelValidator : AbstractModelValidator<MyModel>
{
    protected override void CreateValidationRules()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("A name is mandatory.");
    }

    protected override void UpdateValidationRules(MyModel existing)
    {
        RuleFor(x => x.Id).Equals(existing.Id).WithMessage("Updating the ID is not allowed.");
    }
}
```

### Use the validator

Once you are satisfied, with the validator, you can tell a `DatabaseSerice` to use it. For this, pass the validator type as a second parameter to the `IDatabaseService` interface. The service will use the validator now to check a model before create or update operations.

```csharp
public class MyModelService : CosmosDatabaseService<MyModel, MyModelValidator>
{
    // ...
}
```

### Advanced validation scenarios

Sometimes, you might have multiple different Update or Create scenarios, in which you want to use different validation rules. If this is the case, you can introduce a Custom Validator Mode to the `AbstractModelValidator` and the `IDatabaseService`, which can be considered in the validator logic.

Start, by creating a custom validator mode enum.

```csharp
public enum MyModelValidatorMode
{
    Scenario1,
    Scenario2,
}
```

Add your custom validation mode to the Validator.

```csharp
public class MyModelValidator : AbstractModelValidator<MyModel, MyModelValidatorMode>
{
    protected override void CreateValidationRules()
    {
        // ...
    }

    protected override void UpdateValidationRules(MyModel existing)
    {
        if (CustomValidatorMode == null)
        {
            // Normal validation rules here. No custom MyModelValidatorMode has been passed.
        }
        else
        {
            // Custom validation rules here. A MyModelValidatorMode has been passed.
            switch (CustomValidatorMode)
            {
                case MyModelValidatorMode.Scenario1:
                    RuleFor(x => x.Name).Equals(existing.Id).WithMessage("Updating the ID is not allowed.");
                    break;
                case MyModelValidatorMode.Scenario2:
                    RuleFor(x => x.Name).NotEqual(existing.Id).WithMessage("Can not have the same ID.");
                    break;
            }
        }
    }
}
```

Introduce the Custom Validation Mode to the `DatabaseSerice`  by adding it the list of generics. You can now pass your Custom Validation Mode enum to Create and Update operations.

```csharp
public class MyModelService : CosmosDatabaseService<MyModel, MyModelValidator, MyModelValidatorMode>
{
    // ...

    public async Task CustomUpdate(Guid id, MyModel existing)
    {
        await UpdateAsync(existingDefault.Id, existingDefault, MyModelValidatorMode.Scenario2);
    }
}
```

## Validate with custom validation logic

We highly recommend using the `AbstractModelValidator<T>` approach from above for model validations. In case you have good reasons not to use it, you can also add your own custom validation logic, by using the Validation Hooks.

In your `DatabaseService`, you can override the Validation Hooks and add your custom logic

```csharp
public class MyModelService : CosmosDatabaseService<MyModel>
{
    // ...

    protected override Task<bool> ValidateCreationAsync(MyModel itemToCreate, CancellationToken cancellationToken)
    {
        // Add your own validation logic for newly created models
    }

    protected override Task<bool> ValidateUpdateAsync(MyModel originalItem, MyModel updatedItem, CancellationToken cancellationToken)
    {
        // Add your own validation logic for updated models
    }

    protected override Task<bool> ValidateDeleteAsync(MyModel itemToDelete, CancellationToken cancellationToken)
    {
        // Add your own validation logic for newly models to delete
    }
}
```
