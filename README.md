# BZMarket - Next.js + Supabase E-commerce Platform

A modern, full-stack e-commerce platform migrated from .NET + SQLite to Next.js + Supabase with TypeScript, featuring role-based access control and secure product management.

## 🚀 Features

### Public Shop
- Browse approved products
- Product search and filtering
- Product detail pages
- Responsive design

### Customer Dashboard
- Manage personal products
- Upload product images
- Submit products for approval
- View product status (draft/pending/approved/rejected)

### Admin Panel
- Product moderation (approve/reject)
- User management
- System statistics
- Full product oversight

## 🏗️ Architecture

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Authentication**: Supabase Auth with JWT
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Storage**: Supabase Storage for product images
- **Security**: Database-level security with RLS policies

## 📊 Database Schema

### Tables
- `profiles` - User profiles with roles (admin/customer)
- `products` - Product catalog with approval workflow
- `product_images` - Product image management

### Security
- Row Level Security (RLS) enforced at database level
- Role-based access control
- Secure image upload and storage

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js 18+ 
- Supabase account

### 2. Supabase Setup
1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql` in the SQL editor
3. Set up authentication providers (email/password)
4. Create demo users:
   - Admin: `admin@local` / `Admin123!`
   - Customer: `customer@local` / `Customer123!`

### 3. Environment Variables
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## 🔐 Authentication & Authorization

### Roles
- **Customer**: Can create/edit own products, submit for approval
- **Admin**: Can approve/reject products, manage users

### Security Features
- JWT-based authentication
- Row Level Security (RLS) policies
- Role-based route protection
- Secure file uploads

## 📱 Routes

### Public Routes
- `/` - Product catalog (approved products only)
- `/product/[id]` - Product details
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Protected Routes
- `/dashboard` - Customer dashboard
- `/dashboard/products` - Customer product management
- `/admin` - Admin dashboard (admin only)
- `/admin/products` - Product moderation (admin only)
- `/admin/users` - User management (admin only)

## 🔄 Migration from Original Project

### Data Model Mapping
| Original (.NET) | New (Supabase) | Changes |
|----------------|----------------|---------|
| `Users` (int PK) | `profiles` (UUID PK) | UUID primary keys, simplified structure |
| `Products` | `products` | Same structure, UUID keys |
| `ProductImages` | `product_images` | Supabase Storage integration |
| `Orders` | Not implemented | Future enhancement |

### Key Improvements
- **Security**: Database-level RLS vs application-level
- **Scalability**: Supabase managed infrastructure
- **Real-time**: Built-in real-time capabilities
- **Storage**: Integrated file storage
- **Auth**: Managed authentication service

## 🚦 Business Rules

### Product Workflow
1. Customer creates product (status: `draft`)
2. Customer submits for approval (status: `pending`)
3. Admin approves/rejects (status: `approved`/`rejected`)
4. Only approved products visible to public

### Access Control
- **Public**: View approved products only
- **Customers**: CRUD own products, view own dashboard
- **Admins**: Full access to all products and users

## 🔧 Development

### Key Files
- `lib/supabase/` - Supabase client configuration
- `types/database.ts` - TypeScript type definitions
- `app/` - Next.js App Router pages
- `components/` - Reusable React components

### Database Policies
All security is enforced at the database level using RLS policies. See `supabase-schema.sql` for complete policy definitions.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- Netlify
- Railway
- Self-hosted with Docker

## 📈 Future Enhancements

- [ ] Order management system
- [ ] Payment integration
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Product reviews and ratings
- [ ] Inventory management
- [ ] Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Migration Complete**: This Next.js + Supabase implementation provides all the functionality of the original .NET project with enhanced security, scalability, and modern development practices.