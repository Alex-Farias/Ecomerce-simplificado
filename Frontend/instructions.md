# E-Commerce Simplificado - Frontend Implementation Guide

This document provides comprehensive instructions for building the frontend of the E-Commerce Simplificado application based on the existing backend structure.

## Project Overview

E-Commerce Simplificado is a fully-featured e-commerce platform with:
- User authentication and management
- Product catalog with categories
- Shopping cart functionality
- Order processing
- Customer-vendor messaging system

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **API Communication**: Axios + SWR
- **State Management**: React Context API
- **UI/UX**: Next Themes (dark/light mode)
- **Notifications**: React Hot Toast

## Project Structure

The project follows the Next.js App Router structure:

```
src/
├── app/                    # Next.js App Router pages
│   ├── (admin)/            # Admin-only routes
│   ├── product/            # Product routes
│   ├── cart/               # Cart routes
│   ├── order/              # Order routes
│   ├── chat/               # Chat routes
│   ├── login/              # Auth routes
│   └── ...
├── components/             # Reusable components
│   ├── forms/              # Form components
│   ├── layout/             # Layout components
│   ├── sections/           # Page sections
│   └── ui/                 # UI components
├── context/                # React Context providers
├── hooks/                  # Custom hooks
├── lib/                    # Utility functions
│   ├── api.js              # API client setup
│   └── utils.js            # Helper functions
├── styles/                 # Global styles
└── public/                 # Static assets
```

## Entity Implementation Guidelines

### 1. User Management

**Pages to Implement:**
- `/login`: User login form
- `/register`: New user registration
- `/profile`: User profile management
- `/(admin)/usuario`: Admin user management
- `/(admin)/usuario/perfil`: Profile type management

**Implementation Notes:**
- Use React Hook Form for all user-related forms
- JWT authentication stored in localStorage
- Implement role-based access control for admin pages
- Create protected route wrappers for admin sections

**API Endpoints:**
- Use endpoints from the `/user` and `/user/perfil` paths in the Postman collection

### 2. Product Management

**Pages to Implement:**
- `/`: Homepage with featured products
- `/product`: Product listing page
- `/product/[id]`: Product detail page
- `/category/[id]`: Category-filtered products
- `/(admin)/produto`: Admin product management
- `/(admin)/produto/[id]`: Product edit page
- `/(admin)/categoria`: Category management

**Implementation Notes:**
- Implement filtering and sorting functionality
- Create reusable ProductCard component
- Build search functionality in header
- Add pagination for product listings
- Use image placeholders for missing product images

**API Endpoints:**
- Use endpoints from the `/product` and `/product/category` paths

### 3. Cart Management

**Pages to Implement:**
- `/cart`: Shopping cart page
- `/checkout`: Checkout process

**Implementation Notes:**
- Create CartContext for global cart management
- Persist cart in localStorage for guest users
- Implement quantity adjustments
- Calculate totals client-side
- Add to cart functionality with toast notifications

**API Endpoints:**
- Use endpoints from the `/cart` and `/cart/item` paths

### 4. Order Management

**Pages to Implement:**
- `/orders`: User order history
- `/orders/[id]`: Order detail view
- `/(admin)/pedido`: Admin order management
- `/(admin)/pedido/[id]`: Order details/editing

**Implementation Notes:**
- Order status tracking with visual indicators
- Filter orders by date/status
- Display order line items with product details
- Implement order history viewing

**API Endpoints:**
- Use endpoints from the `/order`, `/order/item`, and `/order/history` paths

### 5. Chat System

**Pages to Implement:**
- `/chat`: Chat inbox
- `/chat/[id]`: Conversation view
- `/(admin)/chat`: Admin chat management

**Implementation Notes:**
- Message list with unread indicators
- Conversation view with message history
- Simple text message inputs
- Support for favorite messages

**API Endpoints:**
- Use endpoints from the `/chat` and `/chat/history` paths

## Common Components to Build

### Layout Components
1. `Header`: Navigation, search, user menu, cart icon
2. `Footer`: Site information, links
3. `Sidebar`: Categories, filters
4. `AdminLayout`: Dashboard layout with sidebar navigation

### UI Components
1. `Button`: Primary, secondary, outlined variants
2. `Input`: Text, select, checkbox, radio inputs
3. `Card`: Product cards, info cards
4. `Modal`: Confirmation dialogs, forms
5. `Table`: Data tables with sorting
6. `Pagination`: Page navigation
7. `Alert`: Success, error, warning messages

## Implementation Steps

### Phase 1: Setup & Core Components
1. Configure project with Next.js and Tailwind CSS
2. Set up API client with axios
3. Create context providers (AuthContext, CartContext)
4. Build reusable UI components
5. Implement layouts

### Phase 2: Authentication & User Features
1. Build login and registration pages
2. Implement AuthContext functionality
3. Create protected route mechanism
4. Build user profile management

### Phase 3: Product Catalog
1. Create product listing pages
2. Implement product detail page
3. Build category filtering
4. Create search functionality
5. Add admin product management

### Phase 4: Shopping Experience
1. Implement cart functionality
2. Build checkout process
3. Create order placement
4. Implement order history and tracking

### Phase 5: Admin Features
1. Build admin dashboard
2. Implement user management
3. Create order management
4. Add product category management

### Phase 6: Chat System
1. Build chat interface
2. Implement conversation view
3. Create admin chat management

### Phase 7: Polish & Optimization
1. Add loading states
2. Implement error handling
3. Optimize images and performance
4. Test responsive design
5. Add dark/light mode

## API Integration

Use the `api.js` client for all backend communication:

```javascript
// Example usage
import apiClient from '@/lib/api';

// Get all products
const getProducts = async () => {
  try {
    const response = await apiClient.products.getAll();
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
```

## State Management

- Use React Context API for global state (auth, cart, theme)
- Use SWR for data fetching with caching
- Use local storage for persistence between sessions

## Form Handling

Use React Hook Form with Zod validation:

```javascript
// Example form setup
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = (data) => {
    // Handle form submission
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

## Error Handling

- Implement toast notifications for user feedback
- Create error boundary components
- Add form validation error messages
- Handle API errors gracefully

## Responsive Design

- Use Tailwind CSS breakpoints consistently
- Test all pages on mobile, tablet, and desktop
- Implement responsive navigation (mobile menu)
- Ensure images are optimized for all screen sizes

## Testing

- Test user flows (login, add to cart, checkout)
- Verify CRUD operations for all entities
- Test responsiveness across devices
- Validate form error handling

## Deployment

- Build optimized production version
- Configure environment variables
- Set up proper error logging
- Enable PWA features if required

---

This implementation guide provides a structured approach to building the E-Commerce Simplificado frontend. Follow these guidelines to ensure consistency across the application while implementing all required features based on the backend entities.
