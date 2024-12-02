# Marketplace Mobile Application

Marketplace application built with React Native for a school project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The Marketplace Mobile Application is a React Native project designed to facilitate the buying and selling of products. Users can create posts for items they wish to sell, browse categories, search for products, and manage their favorite items.

## Features

- User Authentication (Sign Up, Sign In, Sign Out)
- Create, Edit, and Delete Posts
- Browse Products by Category
- Search for Products
- View Product Details
- Manage Favorite Products
- Notifications for New Products
- User Profile Management

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/marketplace-app.git
   cd marketplace-app
   ```
2. Install dependencies:

   ```sh
   npx expo install

   ```
3. Add .env file to root folder with this content
   ```sh
   EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyD91ADessOQ__nBZTU2-zvp58gf0jwEUTM
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=marketplace-65a54.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=marketplace-65a54
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=marketplace-65a54.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=40513142793
   EXPO_PUBLIC_FIREBASE_APP_ID=1:40513142793:web:74d0abbdb0182cfcb9b8d8
   ```
4. Start the developement server:
   ```sh
   npx expo start
   ```

## Usage

- Sign Up / Sign In: Create a new account or sign in with existing credentials.
- Create Post: Add a new product post with title, description, price, category, condition, and images.
- Edit Post: Modify an existing product post.
- Delete Post: Remove a product post.
- Browse Categories: View products by category.
- Search Products: Search for products by title.
- View Product Details: See detailed information about a product.
- Manage Favorites: Add or remove products from favorites.
- Notifications: Receive notifications for newly added products.
- Profile Management: View and update user profile information.
