import React from 'react';
import { View } from 'react-native';
 
import { TestimonySection, TestimonyItem } from 'react-native-testimonials';


const profilePicture1 = require('./profile_pictures/profil_picture_1.png');
const profilePicture2 = require('./profile_pictures/profil_picture_1.png');
const profilePicture3 = require('./profile_pictures/profil_picture_1.png');
const profilePicture4 = require('./profile_pictures/profil_picture_1.png');

const sampleTestimonies: TestimonyItem[] = [
  {
    author_name: 'John Doe',
    author_description: 'Engineer',
    picture: profilePicture1,
    text_comment: 'This product exceeded my expectations! Easy to use, high quality.',
  },
  {
    author_name: 'Jane Smith',
    author_description: 'Designer',
    picture: profilePicture2,
    text_comment: 'Excellent performance and reliable results. Highly recommend it!',
  },
  {
    author_name: 'Bob Johnson',
    author_description: 'Entrepreneur',
    picture: profilePicture3,
    text_comment: 'Great value for money, and super simple setup!',
  },
  {
    author_name: 'Alice Brown',
    author_description: 'Freelancer',
    picture: profilePicture4,
    text_comment: 'My go-to solution for efficiency and quality. Will buy again!',
  },
];
const App = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <TestimonySection
        color_background="#F0F0F0"
        color_title="#000000"
        color_subtitle="#555555"
        color_testemony_background="#464CF6"
        color_testemony_text="#D9D9D9"
        color_testemony_author_name="#000000"
        color_testemony_author_description="#777777"
        font="Helvetica"
        text_title="What Our Customers Say"
        text_subtitle="Real feedback from real users"
        testimonies={sampleTestimonies}
      />
  </View>
);

export default App;