/**
 * Debug script to test chatbot user data fetching
 * Run this with: node test-chatbot-debug.js
 */

const { User, Profile, DailyGoal, ConsumptionLog, FoodItem } = require('./models/relations');
const { Op } = require('sequelize');

// Test function to fetch user data (same as in chatbot controller)
async function testUserDataFetch() {
  try {
    console.log('🔍 Testing user data fetch...');
    
    // List all users first
    const allUsers = await User.findAll({
      attributes: ['id', 'firebase_uid', 'name', 'email']
    });
    
    console.log('📋 Found users:', allUsers.length);
    allUsers.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - Firebase UID: ${user.firebase_uid}`);
    });
    
    if (allUsers.length > 0) {
      const testUser = allUsers[0];
      console.log(`\n🧪 Testing with user: ${testUser.name}`);
      
      // Test the full user data fetch
      const userData = await fetchUserPersonalizationData(testUser.firebase_uid);
      
      if (userData.error) {
        console.log('❌ Error:', userData.error);
      } else {
        console.log('✅ User data fetched successfully:');
        console.log('  - Profile:', !!userData.profile);
        console.log('  - Daily Goals:', !!userData.dailyGoals);
        console.log('  - Today Logs:', userData.todayConsumption?.logCount || 0);
        console.log('  - Recent Logs:', userData.recentPatterns?.logs?.length || 0);
        
        if (userData.dailyGoals) {
          console.log(`  - Calorie Goal: ${userData.dailyGoals.calories} kcal/day`);
        }
      }
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

// Copy of the fetchUserPersonalizationData function
async function fetchUserPersonalizationData(firebaseUid) {
  try {
    const user = await User.findOne({ 
      where: { firebase_uid: firebaseUid },
      include: [
        {
          model: Profile,
          as: 'profile'
        },
        {
          model: DailyGoal,
          as: 'dailyGoals'
        }
      ]
    });

    if (!user) {
      return { error: 'User not found' };
    }

    const today = new Date().toISOString().split('T')[0];
    const todayLogs = await ConsumptionLog.findAll({
      where: { 
        userId: user.id,
        date: today
      },
      include: [{
        model: FoodItem,
        attributes: ['name', 'caloriesPer100g']
      }],
      order: [['consumedAt', 'DESC']]
    });

    return {
      user: {
        name: user.name,
        email: user.email
      },
      profile: user.profile,
      dailyGoals: user.dailyGoals,
      todayConsumption: {
        logCount: todayLogs.length
      }
    };

  } catch (error) {
    console.error('Error fetching user personalization data:', error);
    return { error: error.message };
  }
}

// Run the test
testUserDataFetch()
  .then(() => {
    console.log('\n✅ Test completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Test failed:', error);
    process.exit(1);
  });
