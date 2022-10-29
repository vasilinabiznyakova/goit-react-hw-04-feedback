import { useEffect, useState } from 'react';
import { Box } from './Box';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positiveFeedbackPercentage, setPositiveFeedbackPercentage] =
    useState(0);

  const handleFeedback = evt => {
    const buttonText = evt.currentTarget.textContent.toLowerCase();

    if (buttonText === 'good') {
      setGood(prevState => prevState + 1);
    }
    if (buttonText === 'bad') {
      setBad(prevState => prevState + 1);
    }

    if (buttonText === 'neutral') {
      setNeutral(prevState => prevState + 1);
    }
  };

  useEffect(() => {
    setTotal(good + bad + neutral);
  }, [good, bad, neutral]);

  useEffect(() => {
    setPositiveFeedbackPercentage(Math.round((good / total) * 100));
  }, [good, total]);

  const stateKeys = { good, bad, neutral };
  return (
    <Box
      maxWidth={500}
      border="solid"
      borderColor="black"
      borderRadius={12}
      mt={2}
      ml={2}
      pl={4}
      pt={2}
      pb={2}
    >
      <h2>Feedback Form</h2>

      <FeedbackOptions
        onHandleFeedback={handleFeedback}
        title="Please leave feedback:"
        options={Object.keys(stateKeys)}
      />

      {total > 0 ? (
        <Statistics
          title="Statistics"
          good={good}
          bad={bad}
          neutral={neutral}
          total={total}
          positivePercentage={positiveFeedbackPercentage}
        />
      ) : (
        <Notification message="There is no feedback." />
      )}
    </Box>
  );
};
