# 🤝 Contributing to Vendoora Smart Hotel Platform

Thank you for your interest in contributing to Vendoora! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Examples of behavior that contributes to a positive environment:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**

- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Git
- A code editor (VS Code or Cursor recommended)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

```bash
git clone https://github.com/YOUR_USERNAME/vendoora-mainsalesportal.git
cd vendoora-mainsalesportal
```

3. **Add upstream remote**:

```bash
git remote add upstream https://github.com/vendoora/mainsalesportal.git
```

4. **Install dependencies**:

```bash
npm install
```

5. **Create a branch** for your feature:

```bash
git checkout -b feature/your-feature-name
```

---

## 🔄 Development Workflow

### 1. Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 3. Make Your Changes

- Write clean, readable code
- Follow the coding standards (see below)
- Add tests for new features
- Update documentation as needed

### 4. Test Your Changes

```bash
npm run lint          # Check for linting errors
npm run format        # Format code
npm test              # Run unit tests
npm run test:e2e      # Run E2E tests
npm run build         # Ensure it builds
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

See [Commit Guidelines](#commit-guidelines) for commit message format.

### 6. Push to Your Fork

```bash
git push origin feature/amazing-feature
```

### 7. Create a Pull Request

Go to GitHub and create a pull request from your fork to the main repository.

---

## 📝 Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- **Avoid `any`** - Use proper types or `unknown`
- **Use interfaces** for object shapes
- **Export types** from `src/types/index.ts`

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Bad
const user: any = { ... };
```

### React Components

- **Use functional components** with hooks
- **Use TypeScript** for props
- **Export components as named exports**

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Bad
export default function Button(props) { ... }
```

### File Naming

- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Pages**: kebab-case (`user-profile/page.tsx`)
- **Types**: PascalCase (`UserProfile` interface)

### Code Style

We use **Prettier** for code formatting and **ESLint** for linting.

```bash
npm run format    # Auto-format all files
npm run lint      # Check for errors
npm run lint:fix  # Auto-fix linting errors
```

**Key Rules:**
- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons
- Max line length: 100 characters
- Use trailing commas

---

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation only changes
- `style` - Code style changes (formatting, no code change)
- `refactor` - Code refactoring (no functional changes)
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build process or auxiliary tool changes
- `ci` - CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(kiosk): add E-Star desktop 19 model"

# Bug fix
git commit -m "fix(checkout): resolve payment processing error"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactoring
git commit -m "refactor(catalog): extract product filtering logic"
```

### Scope (Optional)

The scope specifies what part of the codebase is affected:

- `kiosk` - Kiosk-related features
- `locks` - Smart lock features
- `wizard` - Setup wizard
- `checkout` - Checkout flow
- `admin` - Admin dashboard
- `i18n` - Internationalization
- `seo` - SEO features
- `api` - API routes

---

## 🔀 Pull Request Process

### Before Submitting

1. ✅ Code follows style guidelines
2. ✅ All tests pass
3. ✅ New tests added for new features
4. ✅ Documentation updated
5. ✅ No console errors or warnings
6. ✅ PR title follows conventional commits format

### PR Title Format

Use the same format as commit messages:

```
feat(kiosk): add interactive finish swap UI
fix(checkout): resolve Stripe integration issue
docs(readme): update deployment instructions
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated Checks** - GitHub Actions will run tests and linting
2. **Code Review** - At least one maintainer must approve
3. **Changes Requested** - Address feedback and push updates
4. **Approval** - Once approved, a maintainer will merge

---

## 🧪 Testing Guidelines

### Unit Tests

Write unit tests for:
- Utility functions
- Store actions
- Complex components

```typescript
// Example: src/lib/__tests__/utils.test.ts
import { formatCurrency } from '../utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1000, 'us')).toBe('$1,000.00');
  });
});
```

### E2E Tests

Write E2E tests for:
- Critical user flows (setup wizard, checkout)
- Multi-step processes
- Integration points

```typescript
// Example: e2e/setup-wizard.spec.ts
test('complete property setup wizard', async ({ page }) => {
  await page.goto('/setup');
  await page.fill('[name="propertyName"]', 'Test Hotel');
  await page.click('button:has-text("Next")');
  // ... complete wizard
  await expect(page).toHaveURL('/summary');
});
```

### Running Tests

```bash
npm test              # Run all unit tests
npm run test:watch    # Watch mode
npm run test:e2e      # Run E2E tests
npm run test:coverage # Generate coverage report
```

---

## 📚 Documentation

### When to Update Documentation

- Adding a new feature → Update `README.md` and `GETTING_STARTED.md`
- Changing API contracts → Update `TRINITY_TAJ_INTEGRATION.md`
- Modifying deployment process → Update `DEPLOYMENT.md`
- Adding new catalogs → Update `PHASE_A_COMPLETE.md`

### Documentation Standards

- Use **Markdown** for all documentation
- Include **code examples** where applicable
- Add **screenshots** for UI changes
- Keep **line length** under 100 characters
- Use **emoji** sparingly for visual clarity

---

## 🏆 Recognition

Contributors will be recognized in:
- `CONTRIBUTORS.md` file
- GitHub releases
- Project website (coming soon)

---

## 📞 Questions?

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and community discussion
- **Email**: dev@vendoora.com

---

Thank you for contributing to Vendoora! 🎉

