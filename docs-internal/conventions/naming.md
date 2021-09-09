---
sidebar_label: "Naming"
---

# Naming conventions

## Enum naming conventions

### Enum type naming

✔️ DO use a singular type name for an enumeration unless its values are bit fields.

✔️ DO use a plural type name for an enumeration with bit fields as values, also called flags enum.

❌ DO NOT use an "Enum" suffix in enum type names.

❌ DO NOT use "Flag" or "Flags" suffixes in enum type names.

❌ DO NOT use a prefix on enumeration value names (e.g., "ad" for ADO enums, "rtf" for rich text enums, etc.).

### Enum value naming

✔️ DO use a singular name for an enumeration value

### Sources

- <https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/names-of-classes-structs-and-interfaces#naming-enumerations>
