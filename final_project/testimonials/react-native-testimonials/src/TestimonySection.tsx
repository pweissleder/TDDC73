import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageSourcePropType } from 'react-native';
import TestimonyCard from './TestimonyCard';

export interface TestimonyItem {
  author_name: string;
  author_description: string;
  picture?:ImageSourcePropType;
  text_comment: string;
}

export interface TestimonySectionProps {
  // Color variables
  color_background?: string;
  color_title?: string;
  color_subtitle?: string;
  color_testemony_background?: string;
  color_testemony_text?: string;
  color_testemony_author_name?: string;
  color_testemony_author_description?: string;

  // Font for all text
  font?: string;

  // Section Titles
  text_title?: string;
  text_subtitle?: string;

  // Array of testimonies
  testimonies?: TestimonyItem[];
}

const TestimonySection: React.FC<TestimonySectionProps> = ({
  color_background = '#EEEEEE',
  color_title = '#000000',
  color_subtitle = '#333333',
  color_testemony_background = '#FFFFFF',
  color_testemony_text = '#000000',
  color_testemony_author_name = '#000000',
  color_testemony_author_description = '#666666',

  font = 'System',

  text_title = 'Title Text',
  text_subtitle = 'Subtitle Text',

  testimonies = [],
}) => {
  return (
    <View style={[styles.container, { backgroundColor: color_background }]}>
      {/* Title and Subtitle */}
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            { color: color_title, fontFamily: font },
          ]}
        >
          {text_title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: color_subtitle, fontFamily: font },
          ]}
        >
          {text_subtitle}
        </Text>
      </View>

      {/* Testimonies in a scrollable view if needed */}
      <ScrollView
        contentContainerStyle={styles.testimonyWrapper}
        showsVerticalScrollIndicator={false}
      >
        {testimonies.map((item, index) => (
          <TestimonyCard
            key={index.toString()}
            authorName={item.author_name}
            authorDescription={item.author_description}
            picture={item.picture}
            textComment={item.text_comment}
            colorTestimonyBackground={color_testemony_background}
            colorTestimonyText={color_testemony_text}
            colorTestimonyAuthorName={color_testemony_author_name}
            colorTestimonyAuthorDescription={color_testemony_author_description}
            font={font}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  testimonyWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default TestimonySection;