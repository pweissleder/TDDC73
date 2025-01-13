import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

export interface TestimonyCardProps {

  // Text Content
  authorName: string;
  authorDescription: string;
  picture?: ImageSourcePropType;
  textComment: string;

  // Styling
  colorTestimonyBackground?: string;
  colorTestimonyText?: string;
  colorTestimonyAuthorName?: string;
  colorTestimonyAuthorDescription?: string;

  font?: string;
}

const TestimonyCard: React.FC<TestimonyCardProps> = ({
  authorName,
  authorDescription,
  picture,
  textComment,

  colorTestimonyBackground = '#FFFFFF',
  colorTestimonyText = '#000000',
  colorTestimonyAuthorName = '#000000',
  colorTestimonyAuthorDescription = '#666666',
  font = 'System',
}) => {
  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: colorTestimonyBackground },
      ]}
    >
      <Text
        style={[
          styles.commentText,
          { color: colorTestimonyText, fontFamily: font },
        ]}
      >
        {textComment}
      </Text>

      <View style={styles.authorContainer}>
        {/* Picture if provided, otherwise placeholder */}
        {picture ? (
          <Image source={picture} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar} />
        )}
        <View style={styles.authorInfo}>
          <Text
            style={[
              styles.authorName,
              { color: colorTestimonyAuthorName, fontFamily: font },
            ]}
          >
            {authorName}
          </Text>
          <Text
            style={[
              styles.authorDescription,
              { color: colorTestimonyAuthorDescription, fontFamily: font },
            ]}
          >
            {authorDescription}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Styles

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    maxWidth: 300,
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCC',
  },
  authorInfo: {
    marginLeft: 10,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
  },
  authorDescription: {
    fontSize: 12,
  },
});

export default TestimonyCard;