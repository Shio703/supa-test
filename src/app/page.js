'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState('');

  // Mock data for shops and food items
  const [shops] = useState([
    {
      id: 1,
      name: "Sweet Dreams Bakery",
      type: "bakery",
      address: "123 Main St, Downtown",
      distance: "0.5 km",
      rating: 4.8,
      image: "🧁",
      phone: "+1-555-0123"
    },
    {
      id: 2,
      name: "Green Garden Restaurant",
      type: "restaurant",
      address: "456 Oak Ave, City Center",
      distance: "1.2 km",
      rating: 4.6,
      image: "🍽️",
      phone: "+1-555-0456"
    },
    {
      id: 3,
      name: "Corner Deli",
      type: "deli",
      address: "789 Pine St, Westside",
      distance: "2.1 km",
      rating: 4.4,
      image: "🥪",
      phone: "+1-555-0789"
    }
  ]);

  const [foodItems] = useState([
    {
      id: 1,
      shopId: 1,
      shopName: "Sweet Dreams Bakery",
      shopAddress: "123 Main St, Downtown",
      shopDistance: "0.5 km",
      title: "Fresh Pastries & Croissants",
      description: "Assorted pastries, croissants, and bread from today's batch",
      originalPrice: 25.00,
      discountedPrice: 8.99,
      discount: 64,
      category: "bakery",
      pickupTime: "6:00 PM - 8:00 PM",
      quantity: 3,
      image: "🥐",
      tags: ["vegetarian", "fresh"]
    },
    {
      id: 2,
      shopId: 2,
      shopName: "Green Garden Restaurant",
      shopAddress: "456 Oak Ave, City Center",
      shopDistance: "1.2 km",
      title: "Gourmet Salad Bowl",
      description: "Fresh mixed greens, grilled chicken, and seasonal vegetables",
      originalPrice: 18.00,
      discountedPrice: 6.99,
      discount: 61,
      category: "restaurant",
      pickupTime: "7:00 PM - 9:00 PM",
      quantity: 5,
      image: "🥗",
      tags: ["healthy", "protein"]
    },
    {
      id: 3,
      shopId: 1,
      shopName: "Sweet Dreams Bakery",
      shopAddress: "123 Main St, Downtown",
      shopDistance: "0.5 km",
      title: "Artisan Bread Loaves",
      description: "Sourdough, whole wheat, and multigrain bread loaves",
      originalPrice: 15.00,
      discountedPrice: 5.99,
      discount: 60,
      category: "bakery",
      pickupTime: "5:30 PM - 7:30 PM",
      quantity: 8,
      image: "🍞",
      tags: ["organic", "artisan"]
    },
    {
      id: 4,
      shopId: 3,
      shopName: "Corner Deli",
      shopAddress: "789 Pine St, Westside",
      shopDistance: "2.1 km",
      title: "Sandwich Combo Deal",
      description: "Assorted sandwiches with chips and drinks",
      originalPrice: 22.00,
      discountedPrice: 9.99,
      discount: 55,
      category: "deli",
      pickupTime: "6:30 PM - 8:30 PM",
      quantity: 4,
      image: "🥪",
      tags: ["combo", "filling"]
    },
    {
      id: 5,
      shopId: 2,
      shopName: "Green Garden Restaurant",
      shopAddress: "456 Oak Ave, City Center",
      shopDistance: "1.2 km",
      title: "Pasta & Sauce Special",
      description: "Fresh pasta with marinara or pesto sauce, includes garlic bread",
      originalPrice: 20.00,
      discountedPrice: 7.99,
      discount: 60,
      category: "restaurant",
      pickupTime: "7:30 PM - 9:30 PM",
      quantity: 6,
      image: "🍝",
      tags: ["vegetarian", "italian"]
    }
  ]);

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.shopName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Categories', icon: '🍽️' },
    { value: 'bakery', label: 'Bakery', icon: '🧁' },
    { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { value: 'deli', label: 'Deli', icon: '🥪' }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🥗 easyFood</h1>
        <p className={styles.subtitle}>Rescue Food • Save Money • Reduce Waste</p>
        <div className={styles.locationBar}>
          <span className={styles.locationIcon}>📍</span>
          <input
            type="text"
            placeholder="Enter your location..."
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
            className={styles.locationInput}
          />
        </div>
      </header>

      <nav className={styles.nav}>
        <button 
          className={`${styles.navBtn} ${activeTab === 'browse' ? styles.active : ''}`}
          onClick={() => setActiveTab('browse')}
        >
          🛒 Browse Food
        </button>
        <button 
          className={`${styles.navBtn} ${activeTab === 'shops' ? styles.active : ''}`}
          onClick={() => setActiveTab('shops')}
        >
          🏪 Partner Shops
        </button>
        <button 
          className={`${styles.navBtn} ${activeTab === 'business' ? styles.active : ''}`}
          onClick={() => setActiveTab('business')}
        >
          💼 For Business
        </button>
      </nav>

      <main className={styles.main}>
        {activeTab === 'browse' && (
          <div className={styles.browseSection}>
            <div className={styles.searchFilters}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search food or shops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.categoryFilters}>
                {categories.map(category => (
                  <button
                    key={category.value}
                    className={`${styles.categoryBtn} ${selectedCategory === category.value ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.icon} {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.resultsHeader}>
              <h2>Available Food Near You ({filteredItems.length} items)</h2>
            </div>

            <div className={styles.foodGrid}>
              {filteredItems.map(item => (
                <div key={item.id} className={styles.foodCard}>
                  <div className={styles.foodImage}>
                    <span className={styles.foodEmoji}>{item.image}</span>
                    <div className={styles.discountBadge}>-{item.discount}%</div>
                  </div>
                  <div className={styles.foodContent}>
                    <h3 className={styles.foodTitle}>{item.title}</h3>
                    <p className={styles.foodDescription}>{item.description}</p>
                    <div className={styles.shopInfo}>
                      <span className={styles.shopName}>{item.shopName}</span>
                      <span className={styles.shopDistance}>{item.shopDistance}</span>
                    </div>
                    <div className={styles.priceInfo}>
                      <span className={styles.originalPrice}>${item.originalPrice.toFixed(2)}</span>
                      <span className={styles.discountedPrice}>${item.discountedPrice.toFixed(2)}</span>
                    </div>
                    <div className={styles.pickupInfo}>
                      <span className={styles.pickupTime}>⏰ Pickup: {item.pickupTime}</span>
                      <span className={styles.quantity}>📦 {item.quantity} available</span>
                    </div>
                    <div className={styles.tags}>
                      {item.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <button className={styles.reserveBtn}>Reserve Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shops' && (
          <div className={styles.shopsSection}>
            <h2>Partner Shops & Restaurants</h2>
            <div className={styles.shopsGrid}>
              {shops.map(shop => (
                <div key={shop.id} className={styles.shopCard}>
                  <div className={styles.shopHeader}>
                    <span className={styles.shopEmoji}>{shop.image}</span>
                    <div className={styles.shopDetails}>
                      <h3>{shop.name}</h3>
                      <p className={styles.shopType}>{shop.type}</p>
                      <div className={styles.rating}>
                        ⭐ {shop.rating} rating
                      </div>
                    </div>
                  </div>
                  <div className={styles.shopAddress}>
                    📍 {shop.address}
                  </div>
                  <div className={styles.shopDistance}>
                    🚶 {shop.distance} away
                  </div>
                  <div className={styles.shopActions}>
                    <button className={styles.viewMenuBtn}>View Available Food</button>
                    <button className={styles.callBtn}>📞 Call</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className={styles.businessSection}>
            <div className={styles.businessHero}>
              <h2>Join easyFood as a Partner</h2>
              <p>Turn your surplus food into revenue while fighting food waste</p>
            </div>
            
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <span className={styles.benefitIcon}>💰</span>
                <h3>Generate Revenue</h3>
                <p>Sell surplus food instead of throwing it away</p>
              </div>
              <div className={styles.benefitCard}>
                <span className={styles.benefitIcon}>🌍</span>
                <h3>Reduce Waste</h3>
                <p>Contribute to environmental sustainability</p>
              </div>
              <div className={styles.benefitCard}>
                <span className={styles.benefitIcon}>👥</span>
                <h3>Reach New Customers</h3>
                <p>Connect with eco-conscious food lovers</p>
              </div>
              <div className={styles.benefitCard}>
                <span className={styles.benefitIcon}>📱</span>
                <h3>Easy Management</h3>
                <p>Simple dashboard to manage listings</p>
              </div>
            </div>

            <div className={styles.signupForm}>
              <h3>Register Your Business</h3>
              <form className={styles.form}>
                <input type="text" placeholder="Business Name" className={styles.input} />
                <select className={styles.select}>
                  <option value="">Business Type</option>
                  <option value="bakery">Bakery</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Cafe</option>
                  <option value="deli">Deli</option>
                  <option value="grocery">Grocery Store</option>
                  <option value="other">Other</option>
                </select>
                <input type="text" placeholder="Address" className={styles.input} />
                <input type="tel" placeholder="Phone Number" className={styles.input} />
                <input type="email" placeholder="Email Address" className={styles.input} />
                <button type="submit" className={styles.signupBtn}>Join easyFood</button>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>💚 Connecting communities to reduce food waste</p>
      </footer>
    </div>
  );
}
