# Clarity - Weekly Planner

A modern, sleek weekly planning app built with Next.js, React, and Tailwind CSS. Organize your week with drag-and-drop simplicity across 7 days and 5 categories.

## Features

- **Weekly Grid Layout**: Visual 7-day week view with 5 task categories per day
- **5 Categories**: Work, Personal, Health, Learning, and Leisure
- **Color-Coded Tasks**: Each category has its own distinct color for quick identification
- **Quick Add**: Add tasks instantly with the input field in each category row
- **Delete Tasks**: Remove tasks with a single click
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Beautiful dark theme support for comfortable night planning
- **Modern UI**: Clean, minimalist design with smooth animations and transitions

## Categories

- **💼 Work**: Professional tasks and meetings
- **👤 Personal**: Personal errands and admin tasks
- **💪 Health**: Fitness, wellness, and nutrition
- **📚 Learning**: Education, courses, and skill development
- **🎮 Leisure**: Hobbies, entertainment, and relaxation

## Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding Tasks
1. Locate the category row for your desired task type
2. Type the task name in the input field
3. Press Enter or click the "+" button
4. Your task will appear in the category column

### Deleting Tasks
- Click the "✕" button on any task card to remove it

### Planning Your Week
- Each column represents a day of the week
- Each row within a day represents a category
- Tasks are color-coded by category for easy scanning
- Reorganize tasks by adding/removing them as your week evolves

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── WeeklyPlanner.tsx  # Main planner component
│   ├── TaskColumn.tsx     # Day column component
│   └── TaskBox.tsx        # Individual task component
├── context/
│   └── TaskContext.tsx    # React Context for state management
└── types/
    └── index.ts           # TypeScript interfaces
```

## Technologies Used

- **Next.js**: React framework for production
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Context**: State management
- **Next.js App Router**: Modern routing system

## Future Enhancements

- Full drag-and-drop functionality with @dnd-kit
- Local storage persistence
- Weekly task templates
- Task time scheduling
- Recurring tasks
- Export/import functionality
- Collaboration features
- Mobile app version

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## License

MIT License - Feel free to use this for personal or commercial projects.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Happy Planning! 📅✨**
