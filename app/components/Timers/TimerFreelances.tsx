import {Button, Icon} from '@ui-kitten/components';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TimerBackground from './TimerBackground';

const TimerFreelances = () => {
  const timerRef = useRef(null);
  const [hasStartButtonPressed, setHasStartButtonPressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <>
      <TimerBackground
        ref={timerRef}
        onTimes={e => console.log(e, 'OnTimes...')} //when starts and continue
        onPause={e => {
          console.log(e), 'onPause';
          setIsRunning(false);
        }}
        onEnd={e => {
          console.log(e, 'onEnd....');
        }}
        style={styles.timerFree__timer}
        textStyle={{textAlign: 'center', color: '#fefefe', fontWeight: '800'}}
        timeWithLabel={true}
      />
      <View style={styles.timerFree__buttonsBar__container}>
        {!isRunning && !hasStartButtonPressed && (
          <Button
            style={{width: '50%'}}
            status={'success'}
            accessoryLeft={<Icon name="play-circle" />}
            onPress={() => {
              //@ts-ignore
              timerRef.current.start();
              setIsRunning(true);
              setHasStartButtonPressed(true);
            }}
          />
        )}
        {isRunning && (
          <View style={styles.timerFree__button__container}>
            <Button
              status={'warning'}
              size={'medium'}
              accessoryLeft={<Icon name="pause-circle" />}
              onPress={() => {
                //@ts-ignore
                timerRef.current.pause();
                setIsRunning(false);
              }}
            />
          </View>
        )}
        {hasStartButtonPressed && !isRunning && (
          <View style={styles.timerFree__button__container}>
            <Button
              status={'info'}
              accessoryLeft={<Icon name="play-circle-outline" />}
              onPress={() => {
                //@ts-ignore
                timerRef.current.resume();
                setIsRunning(true);
              }}
            />
          </View>
        )}
        {hasStartButtonPressed && (
          <View style={styles.timerFree__button__container}>
            <Button
              accessoryLeft={<Icon name="stop-circle" />}
              status={'danger'}
              onPress={() => {
                //@ts-ignore
                timerRef.current.stop();
                setIsRunning(false);
                setHasStartButtonPressed(false);
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default TimerFreelances;

const globalSpacing = 8;
const styles = StyleSheet.create({
  timerFree__timer: {
    backgroundColor: '#a47dff',
    width: '65%',
    paddingVertical: globalSpacing * 2,
    borderRadius: globalSpacing,
  },
  timerFree__buttonsBar__container: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: globalSpacing * 2,
  },
  timerFree__button__container: {
    paddingHorizontal: globalSpacing / 2,
    width: '45%',
  },
});
