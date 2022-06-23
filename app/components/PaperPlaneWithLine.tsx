import React from 'react';
import {View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface PaperPlaneProps {
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  color?: string;
  containerStyles?: ViewStyle;
}

const PaperPlaneWithLine = ({
  width = 100,
  height = 100,
  color = 'transparent',
  containerStyles,
  borderColor = '#082947',
}: PaperPlaneProps) => {
  return (
    <View style={containerStyles}>
      <Svg
        x="0"
        y="0"
        viewBox="0 0 469.999 469.999"
        width={width}
        height={height}>
        <Path
          fill="#98D9D5"
          d="M234.886 163.812h149.391l-177.825-34.415-37.254 34.416h34.953a7.5 7.5 0 017.5 7.498h15.735a7.5 7.5 0 017.5-7.499z"></Path>
        <Path
          fill="#C1E8E6"
          d="M384.276 178.811h-149.39a7.5 7.5 0 01-7.5-7.5c0-.002-15.735-.002-15.735-.002a7.5 7.5 0 01-7.5 7.502h-34.953l37.254 34.416 177.824-34.416z"></Path>
        <Path
          fill="#FFF"
          d="M210.096 227.8L185.548 313.66 416.441 187.864z"></Path>
        <Path
          fill="#FFF"
          d="M416.442 154.758L185.548 28.962 210.096 114.823z"></Path>
        <Path
          fill={borderColor}
          d="M469.935 172.273c.008-.06.018-.119.024-.179l.005-.069c.009-.097.011-.193.017-.291.007-.131.018-.263.018-.395 0-.19-.011-.321-.018-.453-.006-.097-.007-.193-.017-.291l-.005-.069c-.006-.06-.016-.119-.024-.179-.008-.058-.019-.114-.028-.171a4.587 4.587 0 00-.02-.124c-.01-.056-.013-.111-.024-.167-.011-.051-.015-.078-.02-.103-.025-.119-.06-.235-.09-.352-.016-.063-.031-.127-.049-.19-.011-.038-.018-.077-.03-.114l-.019-.065c-.018-.058-.043-.114-.063-.171a7.705 7.705 0 00-.106-.289c-.024-.061-.043-.125-.068-.186-.054-.128-.117-.25-.178-.375-.048-.099-.091-.202-.143-.298-.031-.056-.067-.109-.099-.165-.042-.073-.079-.132-.115-.191a7.702 7.702 0 00-.435-.633c-.032-.042-.061-.084-.093-.125a7.602 7.602 0 00-.553-.622l-.057-.053c-.039-.038-.082-.073-.122-.111a7.441 7.441 0 00-1.326-.993c-.078-.046-.153-.097-.232-.14-.041-.019-289.061-157.483-289.061-157.483a7.5 7.5 0 00-10.799 8.647l29.466 103.062-50.733 46.868c-.033.03-.061.065-.093.096a7.652 7.652 0 00-.308.316c-.07.076-.141.15-.208.229-.1.117-.193.238-.285.361-.057.076-.116.149-.169.227-.097.14-.186.285-.274.432-.039.066-.082.129-.119.196a7.7 7.7 0 00-.265.53c-.021.046-.046.09-.066.137-.091.21-.172.425-.244.645l-.022.059a7.263 7.263 0 00-.314 1.497 7.595 7.595 0 000 1.563 7.727 7.727 0 00.315 1.503c.006.02.015.04.022.06.072.219.152.435.243.644.02.047.045.092.067.138.083.18.169.357.265.529.037.067.08.13.119.196.088.147.177.292.275.432.054.077.112.15.169.226.093.123.186.245.286.362.067.079.138.153.208.229.1.108.202.214.308.316.032.031.06.065.093.096l50.733 46.868-29.469 103.06a7.5 7.5 0 0010.799 8.648l289.018-157.465c.073-.039.101-.058.13-.074.09-.05.176-.106.264-.16.105-.064.212-.126.313-.195.048-.033.093-.07.141-.104a7.358 7.358 0 00.569-.453c.09-.079.182-.156.268-.239.025-.023.037-.038.05-.051.059-.058.113-.119.17-.179.104-.109.207-.22.305-.335.017-.02.036-.038.052-.058.021-.026.039-.054.06-.08l.087-.112a7.88 7.88 0 00.363-.512c.05-.077.102-.153.149-.232.037-.065.054-.1.073-.133.046-.082.092-.163.135-.247a7.38 7.38 0 00.173-.358c.043-.095.087-.19.126-.287.045-.111.084-.225.124-.338l.018-.049c.02-.059.046-.116.064-.176.011-.036.019-.073.03-.109l.031-.106c.012-.043.02-.088.032-.132l.013-.055c.027-.106.059-.211.082-.319l.013-.075c.018-.084.021-.14.03-.195l.02-.124c.009-.059.02-.116.028-.173zm-265.784 6.539a7.5 7.5 0 000-15h-34.953l37.254-34.416 177.825 34.415H234.886a7.5 7.5 0 100 15h149.39l-177.824 34.416-37.254-34.416h34.953zm212.291-24.054l-206.345-39.935-24.548-85.861 230.893 125.796zM210.096 227.8l206.345-39.936L185.548 313.66l24.548-85.86z"></Path>
        <Path
          fill="#6DA8D6"
          d="M21.888 362.792a126.947 126.947 0 01-3.875-13.77 7.505 7.505 0 00-8.943-5.702 7.5 7.5 0 00-5.702 8.944 142.156 142.156 0 004.335 15.402 7.502 7.502 0 007.092 5.064 7.498 7.498 0 007.093-9.938zM7.501 328.056A7.5 7.5 0 0015 320.594c.024-4.805.289-9.644.788-14.383a7.5 7.5 0 00-6.674-8.244c-4.111-.44-7.81 2.555-8.244 6.674A160.056 160.056 0 000 320.518c-.02 4.142 3.32 7.517 7.501 7.538zM12.252 282.935c.756.24 1.521.354 2.274.354a7.505 7.505 0 007.146-5.229 141.637 141.637 0 015.054-13.478 7.5 7.5 0 00-13.758-5.978 156.872 156.872 0 00-5.591 14.911 7.5 7.5 0 004.875 9.42zM48.868 217.554a7.5 7.5 0 00-10.578.773 158.834 158.834 0 00-9.782 12.548 7.5 7.5 0 1012.279 8.615 144.073 144.073 0 018.855-11.358 7.5 7.5 0 00-.774-10.578zM74.427 187.407a158.583 158.583 0 00-13.063 9.077 7.5 7.5 0 009.168 11.872 143.482 143.482 0 0111.822-8.214 7.5 7.5 0 00-7.927-12.735zM113.504 445.602a127.092 127.092 0 01-13.732-4.035 7.502 7.502 0 00-5.034 14.131 142.303 142.303 0 0015.359 4.512 7.503 7.503 0 001.71.198 7.5 7.5 0 001.697-14.806zM74.104 429.004a128.93 128.93 0 01-11.622-8.361 7.497 7.497 0 00-10.547 1.119 7.499 7.499 0 001.12 10.547 143.634 143.634 0 0012.983 9.342 7.495 7.495 0 0010.356-2.29 7.501 7.501 0 00-2.29-10.357zM34.155 388.599a7.498 7.498 0 00-10.329-2.409 7.5 7.5 0 00-2.409 10.329 143.414 143.414 0 009.189 13.085 7.484 7.484 0 005.892 2.854 7.499 7.499 0 005.882-12.146 128.865 128.865 0 01-8.225-11.713zM156.064 447.893c-4.43.526-8.952.794-13.44.794-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5c5.078 0 10.196-.303 15.212-.899a7.5 7.5 0 10-1.772-14.895zM196.34 435.042a112.264 112.264 0 01-12.842 5.982 7.5 7.5 0 105.461 13.97 127.52 127.52 0 0014.562-6.783 7.5 7.5 0 10-7.181-13.169zM239.781 407.363a7.501 7.501 0 00-10.563.964 113.904 113.904 0 01-9.764 10.333 7.501 7.501 0 005.119 12.983c1.833 0 3.67-.668 5.116-2.018 3.911-3.65 7.63-7.586 11.055-11.698a7.5 7.5 0 00-.963-10.564zM259.19 366.413c-3.937-1.286-8.17.87-9.454 4.808a112.118 112.118 0 01-5.25 13.202 7.5 7.5 0 0013.558 6.418 127.28 127.28 0 005.955-14.974 7.5 7.5 0 00-4.809-9.454zM118.151 168.671a156.572 156.572 0 00-15.191 4.754 7.5 7.5 0 105.202 14.068 142.018 142.018 0 0113.733-4.297 7.501 7.501 0 005.391-9.135 7.497 7.497 0 00-9.135-5.39z"></Path>
      </Svg>
    </View>
  );
};

export default PaperPlaneWithLine;
