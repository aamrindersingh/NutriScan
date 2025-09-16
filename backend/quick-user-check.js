// Quick user data check
require('dotenv').config();
const { User, Profile, DailyGoal } = require('./models/relations');

async function checkUserData() {
  try {
    const users = await User.findAll({
      include: [
        { model: Profile, as: 'profile' },
        { model: DailyGoal, as: 'dailyGoals' }
      ]
    });
    
    console.log('=== USER DATA CHECK ===');
    console.log(`Found ${users.length} users:`);
    
    users.forEach(user => {
      console.log(`\n👤 ${user.name} (${user.email})`);
      console.log(`   Firebase UID: ${user.firebase_uid}`);
      console.log(`   Has Profile: ${!!user.profile}`);
      console.log(`   Has Goals: ${!!user.dailyGoals}`);
      
      if (user.profile) {
        console.log(`   Profile: ${user.profile.age}y, ${user.profile.gender}, ${user.profile.goalType}`);
      }
      
      if (user.dailyGoals) {
        console.log(`   Calorie Goal: ${user.dailyGoals.calories} kcal/day`);
      }
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUserData();
