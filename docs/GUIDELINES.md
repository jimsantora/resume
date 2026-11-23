# Resume Website Project Guidelines

## Core Purpose

To create an engaging, terminal-themed static website that showcases my professional experience in tech and gaming, with an emphasis on clean code and reliable functionality.

## Design Principles

- Favor static content and CSS-based solutions over complex state management
- Prioritize reliability over feature complexity
- Interactive elements should be simple and self-contained
- New features should only be added if they meaningfully enhance the user experience

## Complexity Warning Signs

The assistant should flag suggestions or changes that:

- Require complex state management across multiple components
- Need external state management solutions
- Rely heavily on browser APIs or local storage
- Require significant client/server synchronization
- Add multiple interdependent features
- Create timing or race conditions

## Acceptable Complexity

Some features are worth the added complexity if they significantly enhance the site:

- Simple theme switching (dark/light mode)
- Basic animations and transitions
- Typewriter effects
- Terminal-style UI components
- Simple hover interactions

## Implementation Approach

1. Start with static content and styling
2. Add simple, isolated interactive elements
3. Test thoroughly before adding new features
4. Prefer CSS solutions over JavaScript when possible
5. Keep components focused and independent

## Development Workflow

When evaluating new features or changes:

1. Question whether it's necessary for the core experience
2. Consider if there's a simpler way to achieve the same goal
3. Evaluate the maintenance cost of the addition
4. Implement the simplest working version first

The assistant should actively help maintain these principles by:

- Suggesting simpler alternatives when complexity increases
- Breaking complex features into simpler, independent pieces
- Identifying potential maintenance issues
- Recommending CSS-based solutions over JavaScript where appropriate
