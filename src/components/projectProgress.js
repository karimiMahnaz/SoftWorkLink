import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProjectProgress = (item) => {
   // const [progressPercent, setProgressPercent] = useState(0);
   // const [progressColor, setProgressColor] = useState(''); 
   // const [daysDifference, setDaysDifference] = useState(null);
    
    //console.log('item.requiredHours', item.item.requiredHours);
   // console.log('item.spentHours', item.item.spentHours);
    const percent = (item.item.spentHours/item.item.requiredHours) * 100;
    //setProgressPercent(percent);
    //console.log('percent999999' , percent);

    const today = new Date();
    const startDate = new Date(item.item.startDate); 
    const endDate = new Date(item.item.endDate);

    const timeDifference1 = startDate.getTime() - today.getTime();
    const timeDifference2 = endDate.getTime() - today.getTime();
    
    // Calculate the number of days and hours
      const daysDifference1 = Math.floor(timeDifference1 / (1000 * 60 * 60 * 24)) * 24;
   //   console.log('timeDifference1',daysDifference1 )
      const daysDifference2 = Math.floor(timeDifference2 / (1000 * 60 * 60 * 24)) * 24;
   //   console.log('timeDifference2',daysDifference2 )
    // Set the result in the state
  //  setDaysDifference(daysDifference2);

     // console.log('today', today);
        
     // console.log('item.startDate', item.item.startDate);
       
      //  console.log('today', today);
      let progressColor = "";
          if (daysDifference1 > 0 && daysDifference2 > 0) { progressColor = 'gray'}
         else if (daysDifference1 < 0 && daysDifference2 > 0 && percent > 0) {
               progressColor = 'green';
         } else if (daysDifference1 > 0 && daysDifference2 > 0 && percent < 50) {
               progressColor = 'yellow';
         } if (daysDifference1 < 0 && daysDifference2 < 0) {
               progressColor = 'red';
         }
    
      //  const taskTime = endDate.getTime() - startDate.getTime();
      // Format the date as needed
       // const timeDifference = target.getTime() - today.getTime();
      // Format the date as needed
      // const formattedDate = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
      // {
      //   console.log('formattedDate', formattedDate);
      //   if (item.endDate <= item.startDate) {
      //     return item.spentHours / item.requiredHours;
      //   } else {
      //     return 0;
      //   }
      //  // item.spentHours/item.requiredHours < 1 ? backgroundColor:green : item.spentHours/item.requiredHours == 1 ? backgroundColor: yellow: backgroundColor:red
      // }

  return (
    <View style={[styles.taskProgress, {backgroundColor: progressColor}]}>
      <Text style={{color: 'white'}}>{percent}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskProgress: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    maxHeight: 30,
    maxWidth: 52,
    borderRadius: 5,
    fontWeight:'bold',
  },
  text: {
    // Additional styles for the text (customize as needed)
    color: '#333', // Example text color
  },
});

export default ProjectProgress;
