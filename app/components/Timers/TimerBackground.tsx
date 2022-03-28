import {Text} from '@ui-kitten/components';
import React, {useEffect, useImperativeHandle, useState} from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

export interface Props {
  initialSeconds?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fontFamily?: string;
  autoStart?: boolean;
  onTimes?: (seconds: number) => void;
  onPause?: (seconds: number) => void;
  onEnd?: (seconds: number) => void;
  timeWithLabel?: boolean;
}

let interval: any = null;
let hours = 0;
let minute = 0;
let seconds = 0;
let currentSeconds = 0;

const TimerBackground = React.forwardRef((props: Props, ref) => {
  const [key, setKey] = useState(Math.random());
  const {
    initialSeconds = 0,
    style,
    textStyle,
    fontFamily,
    autoStart = false,
    onEnd,
    onTimes,
    onPause,
    timeWithLabel = false,
  } = props;

  useImperativeHandle(ref, () => {
    return {start, pause, resume, stop};
  });

  useEffect(() => {
    return () => {
      pause();
      init();
      setKey(Math.random());
    };
  }, []);

  useEffect(() => {
    if (initialSeconds > 0) {
      init();
    }
    setKey(Math.random());
  }, [initialSeconds]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, initialSeconds]);

  const timer = () => {
    interval = BackgroundTimer.runBackgroundTimer(() => {
      currentSeconds = currentSeconds + 1;
      if (seconds < 60) {
        seconds = seconds + 1;
      } else {
        seconds = 0;
        minute = minute + 1;
      }
      if (minute === 60) {
        minute = 0;
        hours = hours + 1;
      }
      if (onTimes) {
        onTimes(currentSeconds);
      }
      setKey(Math.random());
    }, 1000);
  };

  const initTime = (iSeconds: number) => {
    if (iSeconds >= 3600) {
      hours = ~~(iSeconds / 3600);
      const times = iSeconds % 3600;
      initTime(times);
    } else {
      if (iSeconds >= 60) {
        minute = ~~(iSeconds / 60);
        const times = iSeconds % 60;
        initTime(times);
      } else {
        seconds = iSeconds;
      }
    }
  };

  const init = () => {
    currentSeconds = 0;
    hours = 0;
    minute = 0;
    seconds = 0;
    if (initialSeconds > 0) {
      initTime(initialSeconds);
    }
    clear();
    setKey(Math.random());
  };

  const start = () => {
    init();

    if (!interval) {
      timer();
    }
  };

  const pause = () => {
    clear();
    BackgroundTimer.stopBackgroundTimer();
    if (onPause) {
      onPause(currentSeconds);
    }
  };

  const resume = () => {
    if (!interval) {
      timer();
    }
  };

  const stop = () => {
    if (onEnd) {
      onEnd(currentSeconds);
    }
    BackgroundTimer.stopBackgroundTimer();
    init();
    setKey(Math.random());
    clear();
  };

  const clear = () => {
    if (interval) {
      BackgroundTimer.clearInterval(interval);
      BackgroundTimer.stopBackgroundTimer();
      clearInterval(interval);
      interval = null;
    }
  };

  const font = () => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily,
      };
    } else {
      return {};
    }
  };

  const renderTimer = () => {
    if (hours > 0) {
      return timeWithLabel ? (
        <Text style={[textStyle, font()]}>{`${hours} hs ${
          minute.toString().length === 1 ? '0' : ''
        }${minute} min ${
          seconds.toString().length === 1 ? '0' : ''
        }${seconds} seg`}</Text>
      ) : (
        <Text style={[textStyle, font()]}>{`${hours}:${
          minute.toString().length === 1 ? '0' : ''
        }${minute}:${
          seconds.toString().length === 1 ? '0' : ''
        }${seconds}`}</Text>
      );
    } else {
      if (minute > 0) {
        return timeWithLabel ? (
          <Text style={[textStyle, font()]}>{`${minute} min ${
            seconds.toString().length === 1 ? '0' : ''
          }${seconds} seg`}</Text>
        ) : (
          <Text style={[textStyle, font()]}>{`${minute}:${
            seconds.toString().length === 1 ? '0' : ''
          }${seconds}`}</Text>
        );
      } else {
        return timeWithLabel ? (
          <Text style={[textStyle, font()]}>{`${seconds} seg`}</Text>
        ) : (
          <Text style={[textStyle, font()]}>{`${seconds}`}</Text>
        );
      }
    }
  };

  return (
    <View style={style} key={key}>
      {renderTimer()}
    </View>
  );
});

export default TimerBackground;
