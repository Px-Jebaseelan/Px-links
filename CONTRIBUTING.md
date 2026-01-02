# Contributing to Phoenix Links

Thank you for considering contributing to Phoenix Links! This document provides guidelines and instructions for contributing.

## 🎯 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please follow these principles:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Respect differing opinions
- Report unacceptable behavior to maintainers

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0+
- Git
- MongoDB (local or Atlas)
- Basic knowledge of Next.js/React

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/phoenix-links.git
   cd phoenix-links
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create `.env.local`**
   ```bash
   cp .env.example .env.local
   # Edit with your MongoDB connection string
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

### Before You Start
1. Check existing issues and pull requests
2. Create an issue for discussion if needed
3. Wait for feedback from maintainers
4. Fork and create a feature branch

### Making Changes

1. **Follow the code style**
   - Use TypeScript for type safety
   - Follow existing naming conventions
   - Keep functions small and focused
   - Add comments for complex logic

2. **Test your changes**
   - Test in development environment
   - Test on mobile devices
   - Test error scenarios
   - Run the linter: `npm run lint`

3. **Commit messages**
   ```
   feat: Add new feature description
   fix: Fix bug description
   docs: Update documentation
   style: Code style changes (no logic change)
   refactor: Code refactoring
   perf: Performance improvements
   test: Add/update tests
   chore: Maintenance tasks
   ```

### Pushing Changes

1. **Update your fork**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Use a clear title and description
   - Link related issues
   - Add screenshots if UI changes
   - Explain the changes and why

## 📋 Pull Request Guidelines

### PR Title Format
```
[Type] Brief description of changes
```

Types:
- `[Feature]` - New feature
- `[Fix]` - Bug fix
- `[Docs]` - Documentation
- `[Style]` - Code style
- `[Refactor]` - Code refactoring
- `[Perf]` - Performance improvement

### PR Description Template
```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Changes Made
- Bullet point 1
- Bullet point 2

## Testing
How to test the changes:
1. Step 1
2. Step 2

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No new warnings generated
```

## 🎨 Code Style Guide

### TypeScript/React

```typescript
// Use proper TypeScript types
interface LinkProps {
  id: string
  title: string
  clicks: number
}

// Use functional components
export default function LinkItem({ id, title, clicks }: LinkProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Clicks: {clicks}</p>
    </div>
  )
}

// Use const for exports
export const utilityFunction = () => {
  // Implementation
}

// Add JSDoc comments for public functions
/**
 * Updates a link in the database
 * @param linkId - The link ID to update
 * @param data - Updated link data
 * @returns Updated link object
 */
export async function updateLink(linkId: string, data: Partial<Link>) {
  // Implementation
}
```

### CSS/Tailwind

```tsx
// Use Tailwind classes
className="flex items-center justify-between px-4 py-2 rounded-lg"

// Use semantic class names
className="text-lg font-semibold text-slate-900"

// Group related classes
className={`
  flex flex-col gap-4
  px-6 py-4
  bg-white rounded-lg
  border border-slate-200
`}
```

### File Organization

```
components/
├── LinkItem.tsx        # Single component
├── forms/
│   └── LinkForm.tsx   # Form components
└── layout/
    └── Header.tsx     # Layout components

api/
├── links/
│   └── route.ts       # Link routes
└── users/
    └── route.ts       # User routes

models/
├── User.ts            # Database model
└── Links.ts           # Database model
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Form validation works
- [ ] Error handling works
- [ ] Loading states appear
- [ ] Success messages show

### Browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📚 Documentation

### Update Documentation When:
- Adding new features
- Changing API endpoints
- Modifying configuration
- Updating dependencies

### Documentation Files
- `README.md` - Main documentation
- `QUICKSTART.md` - Setup guide
- `API.md` - API reference
- `CONTRIBUTING.md` - This file

## 🐛 Bug Reports

### Before Reporting
- Check if bug is already reported
- Update to latest version
- Try to reproduce with minimal steps

### Bug Report Format
```markdown
## Description
Brief description of the bug.

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Node.js: [e.g., 18.0.0]

## Screenshots
If applicable, add screenshots.

## Additional Context
Any other relevant information.
```

## 💡 Feature Requests

### Feature Request Format
```markdown
## Description
Brief description of the feature.

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternative Solutions
Other possible approaches.

## Additional Context
Any other relevant information.
```

## 📦 Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Example
```
feat(links): add ability to edit link titles

Add new PUT endpoint to update link details.
Update LinkItem component with inline editor.

Closes #123
```

## 🔍 Review Process

1. **Automated Checks**
   - GitHub Actions run tests
   - Linter checks code style
   - Build process verifies changes

2. **Code Review**
   - Maintainers review code
   - May request changes
   - Discuss approach if needed

3. **Merge**
   - After approval, PR is merged
   - Branch is deleted
   - Changes appear in next release

## 📦 Release Process

Releases follow semantic versioning:
- **Major** (X.0.0) - Breaking changes
- **Minor** (0.X.0) - New features
- **Patch** (0.0.X) - Bug fixes

## 🎯 Roadmap

See [README.md](./README.md#-roadmap) for planned features.

## 💬 Getting Help

- **Documentation**: See [README.md](./README.md)
- **Issues**: Open a GitHub issue
- **Discussions**: Start a discussion
- **Email**: contact@example.com

## 📄 License

By contributing, you agree your code will be licensed under the MIT License.

## 🙏 Thank You

Thank you for contributing to Phoenix Links! Your help makes this project better.

---

<div align="center">

**Happy Contributing!** 🎉

</div>
