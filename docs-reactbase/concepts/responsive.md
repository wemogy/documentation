# Responsive Design

## What does responsive design mean?

Our definition of responsive design is that an **application component** is designed to respond to the **size** that the component has or the **device type** that the component is running on.

### What about the viewport size?

We don't care about the viewport size when we develop a responsive component. Because a component should look always good based on the space that the component has. For example a component may must look different when it is used in a small modal dialog instead of a full screen modal dialog. In both cases the viewport has the same size, which means that the viewport is not the optimal reference value.

### What is the device type?

An application could be used on a mobile phone, tablet or desktop. The user can interact with the app using a mouse or a touchscreen. To cover all this different screen sizes with different ways of interaction we introduced the abstract term **device type**. The user can define the device types for himself by using predefined selectors or developing a custom selector.

## Local and global rules


### Device type based

Sometimes you want to change general design values based on the device type. For example:

- you want to have the duplicate mergin when the app is used on a mobile phone which is connected to a car via bluetooth (like spotify car mode).
- you want to have a bigger font size on devices with a lower DPI (like a mobile phone with a DPI of 160).

These values are defined globally in the theme and will be resolved globally to the same value for all components based on the device type.

## Component size based

The following properties are based on the size of the component:

- Layout (arrangement of the component elements)
  - When the component width is small, the elements are arranged in a single column.
- Hide/show elements
  - When the component width is small, the elements are hidden or minimized (only icon instead of icon + label).
- Dimensions of an element
  - When the component width is small, the dimensions of an element are reduced.

### Defining the component sizes

The component sizes must be defined globally in the theme in the section `componentSizes`

```typescript title="YourTheme.ts"
{
  // ...
  componentSizes: {
    sm: (width: number): boolean => width < 400,
    md: {
      minWidth: 600,

    }
  }
}
```

### Implementing a responsive component

Change the value of a `ResponsiveValue` based on the component size.

```tsx title="MyComponent.tsx"
<StackLayout horizontal={{md: true}}>
  // ...
</StackLayout>
```


### PoC

```typescript
const theme = {
  sizes: {
    margin: {
      md: 10,
      sm: { mobile: 20, tablet: 30 }
    }
  },
  core: {
    button: {
      primary: {
        margin: { sm: 'sm'}
      }
    }
  }
}
```

Theme resolving:

1. DeviceBased properties should be resolved globally to the `ThemeContext`
1. ComponentBased properties should be resolved based in the component scope
    1. When the component rerenders, it should not calculate the style again

### Components with different composition of elements

![Desktop](/img/docs-reactbase/concepts/Space_Settings_Desktop.png)

![Mobile](/img/docs-reactbase/concepts/Space_Settings_Mobile.png)

- Elements are under each other in the mobile version
- The size (height/width) of the elements changes
- Elements are minified on mobile (icon only, instead of icon + text)
