import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Text} from '@ui-kitten/components';
import TimerBackground from './TimerBackground';
import elevations from '../../utils/ui/elevations';

interface Props {
  label?: string;
  onPressReset: () => void;
  onStartPress: () => void;
  onStopPress: (e: number) => void;
  resetTimer?: boolean;
}

const TimerFreelances = ({
  label,
  onPressReset,
  onStartPress,
  onStopPress,
  resetTimer = false,
}: Props) => {
  const timerRef = useRef(null);
  const [hasStartButtonPressed, setHasStartButtonPressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  //REVISAR ESTO SI ES NECESARIO O NO ESE useCallback
  const resetTimerFromAbove = useCallback(() => {
    if (resetTimer) {
      //@ts-ignore =>  added because the stop() function
      timerRef.current && timerRef.current.stop();
      setIsRunning(false);
      setHasStartButtonPressed(false);
      return;
    }
    return;
  }, [resetTimer]);

  useEffect(() => {
    resetTimerFromAbove();
    return () => {};
  }, [resetTimer]);

  return (
    <>
      {label ? (
        <Text category={'s1'} style={styles.timerFree__label}>
          {label}
        </Text>
      ) : null}
      <TimerBackground
        ref={timerRef}
        onTimes={e => console.log(e, 'OnTimes...')} //when starts and continue
        onPause={e => {
          onStopPress(e);
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
            style={[
              {
                width: '50%',
              },
              elevations.elevation04,
            ]}
            status={'success'}
            accessoryLeft={<Icon name="play-circle" />}
            onPress={() => {
              //@ts-ignore
              timerRef.current.start();
              onStartPress();
              setIsRunning(true);
              setHasStartButtonPressed(true);
            }}
          />
        )}
        {hasStartButtonPressed && isRunning && (
          <View style={styles.timerFree__button__container}>
            <Button
              style={elevations.elevation04}
              status={'primary'}
              size={'medium'}
              accessoryLeft={<Icon name="stop-circle-outline" />}
              onPress={() => {
                //@ts-ignore
                timerRef.current.pause();
                setIsRunning(false);
              }}
            />
          </View>
        )}
        {/* {hasStartButtonPressed && !isRunning && (
          <View style={styles.timerFree__button__container}>
            <Input
              value={description}
              label="Qué hiciste en este tiempo ?"
              size="medium"
              multiline={true}
              textStyle={{minHeight: 48}}
              placeholder="Ej: Freelances app"
              style={{marginBottom: 4}}
              autoCorrect={false}
              // caption={renderCaption}
              // accessoryRight={renderIcon}
              // secureTextEntry={secureTextEntry}
              onChangeText={nextValue => setDescription(nextValue)}
            />
            <Button
              status={'info'}
              disabled={!description}
              accessoryLeft={<Icon name="save-outline" />}
              onPress={() => {
                //@ts-ignore
                // timerRef.current.resume();
                // setIsRunning(true);
                onSavePress(description);
              }}
            />
          </View>
        )} */}
        {/* {hasStartButtonPressed && !isRunning && (
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
        )} */}
        {/* {hasStartButtonPressed && (
          <View style={styles.timerFree__button__container}>
            <Button
              accessoryLeft={<Icon name="save-outline" />}
              status={'primary'}
              onPress={() => {
                //@ts-ignore
                timerRef.current.stop();
                setIsRunning(false);
                setHasStartButtonPressed(false);
              }}
            />
          </View>
        )} */}
        {hasStartButtonPressed && (
          <View
            style={[
              isRunning
                ? [
                    styles.timerFree__resetButton__container,
                    styles.timerFree__resetButton__running,
                  ]
                : [styles.timerFree__resetButton__container],
            ]}>
            <Button
              accessoryLeft={<Icon name="refresh-outline" />}
              status={'basic'}
              onPress={() => {
                //@ts-ignore
                timerRef.current.stop();
                onPressReset();
                setIsRunning(false);
                setHasStartButtonPressed(false);
              }}
              style={styles.timerFree__resetButton}
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
  timerFree__label: {
    marginBottom: globalSpacing,
  },
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
    width: '105%',
  },
  timerFree__resetButton__container: {
    position: 'absolute',
    bottom: globalSpacing * 2.2,
    left: '95%',
  },
  timerFree__resetButton__running: {
    bottom: globalSpacing * 8,
    alignSelf: 'center',
  },
  timerFree__resetButton: {
    borderRadius: globalSpacing * 3,
    height: '100%',
    width: '75%',
  },
});
