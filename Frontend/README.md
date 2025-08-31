# Hospital Funding Platform

A complete React + Tailwind CSS frontend application for managing hospital funding requests, user payments, and fund management workflows.

## 🚀 Features

### General Setup
- **React Router** for seamless navigation
- **Clean navbar and footer** across all pages
- **Modern, minimal design** with blue/white/gray color theme
- **Fully responsive** (mobile + desktop)
- **Smooth page transitions** using Framer Motion
- **Organized component structure** (pages, components, layouts)

### User Side
- **Signup/Login Page** with form validation
- **Dashboard** showing wallet balance and recent transactions
- **Profile Page** with editable personal information
- **QR Generator** for creating payment QR codes

### Hospital Side
- **Login Page** for hospital authentication
- **Dashboard** with wallet balance and pending fund requests
- **QR Scanner** for processing patient payments
- **Fund Request Form** with urgency levels and validation
- **Fund Transfer Details** table with status tracking

### Fund Manager Side
- **Login Page** for fund manager access
- **Dashboard** with overview of pending requests
- **Approve/Reject Page** with interactive review system
- **Transfer History** with comprehensive filtering and search

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router v6** for navigation
- **Framer Motion** for animations
- **Responsive design** with mobile-first approach

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── layouts/             # Layout components
│   └── Layout.tsx
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── user/           # User-related pages
│   ├── hospital/       # Hospital-related pages
│   └── fundManager/    # Fund manager pages
├── App.tsx             # Main app component
└── index.tsx           # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hospital-funding-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🎯 Usage

### Navigation Flow

1. **Home Page** - Choose your role (User, Hospital, or Fund Manager)
2. **Login/Signup** - Authenticate with your credentials
3. **Dashboard** - Access role-specific features and overview
4. **Feature Pages** - Navigate to specific functionality

### User Workflow
1. Sign up or log in
2. View wallet balance and transactions
3. Generate QR codes for hospital payments
4. Update profile information

### Hospital Workflow
1. Log in with hospital credentials
2. View hospital wallet and pending requests
3. Scan patient QR codes for payments
4. Submit fund requests with urgency levels
5. Track request status and transfers

### Fund Manager Workflow
1. Log in with manager credentials
2. Review pending fund requests
3. Approve or reject requests with notes
4. View complete transfer history
5. Monitor funding statistics

## 🎨 Design Features

- **Color Scheme**: Blue/white/gray theme with semantic colors
- **Typography**: Inter font family for modern readability
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design with breakpoint optimization
- **Accessibility**: Proper contrast ratios and focus states

## 🔧 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update color schemes in `src/index.css`
- Adjust component styles in individual component files

### Components
- Reusable components in `src/components/`
- Easy to extend and modify
- Consistent prop interfaces

### Data
- Currently uses mock data
- Easy to integrate with real APIs
- Structured for backend compatibility

## 📱 Responsive Design

- **Mobile**: Optimized for small screens
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full-featured desktop experience
- **Breakpoints**: Tailwind's responsive utilities

## 🚀 Performance Features

- **Code splitting** with React Router
- **Optimized animations** with Framer Motion
- **Efficient re-renders** with React hooks
- **Lazy loading** ready for future optimization

## 🔒 Security Considerations

- **Form validation** on client side
- **Input sanitization** ready for backend integration
- **Authentication flow** prepared for API integration
- **Role-based access** control structure

## 🧪 Testing

```bash
npm test
# or
yarn test
```

## 📦 Deployment

### Build and Deploy
```bash
npm run build
# Deploy the 'build' folder to your hosting service
```

### Environment Variables
Create `.env` files for different environments:
- `.env.local` for local development
- `.env.production` for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code structure

## 🔮 Future Enhancements

- **Real-time updates** with WebSocket integration
- **Advanced analytics** and reporting
- **Mobile app** development
- **API integration** with backend services
- **Enhanced security** features
- **Multi-language** support

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
