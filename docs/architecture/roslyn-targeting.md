# Roslyn targeting

::: tip Languages
[简体中文](/zh/architecture/roslyn-targeting)
:::

## Multi-Roslyn builds

The NuGet package **MvvmAIO.R3.SourceGenerators** ships multiple analyzer assemblies:

| Folder under `analyzers/dotnet/` | Roslyn API band |
|----------------------------------|-----------------|
| `roslyn4.3` | 4.3.x (e.g. older toolchains) |
| `roslyn4.12` | 4.12.x |
| `roslyn5.0` | 5.0.x |

**MSBuild** selects the folder matching the compiler’s Roslyn version in the consuming project. You do not reference these paths manually.

## Repository projects

Each band has a dedicated project that links the shared `.shproj` sources:

- `MvvmAIO.R3.SourceGenerators.Roslyn4031`
- `MvvmAIO.R3.SourceGenerators.Roslyn4120`
- `MvvmAIO.R3.SourceGenerators.Roslyn5000`

When changing generator logic that uses Roslyn APIs, verify behavior across bands if APIs differ.

## Consumer requirements

- Use a supported **.NET SDK** and IDE (Visual Studio 2022 17.13+, Rider, or VS Code with C# Dev Kit).
- Prefer **`.slnx`** solutions in this ecosystem.

## Tests

`MvvmAIO.R3.SourceGenerators.Tests` runs against a pinned Roslyn test host (see generator repo `Directory.Build.props` / test project references).
