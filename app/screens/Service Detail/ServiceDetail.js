import React from "react";
import { View, Image } from "react-native";
import Collection from "../../utils/Collection";

import Gaji from "../../screens/Service Detail/Pages/Gaji";
import History from "../../screens/Service Detail/Pages/History";
import Ticketing from "../../screens/Service Detail/Pages/Ticketing";
import Poliklinik from "../../screens/Service Detail/Pages/Poliklinik";
import Pendidikan from "../../screens/Service Detail/Pages/Pendidikan";
import Keuangan from "../../screens/Service Detail/Pages/Keuangan";
import SDM from "../../screens/Service Detail/Pages/SDM";
import Pengembangan from "../../screens/Service Detail/Pages/Pengembangan";
import Sarana from "../../screens/Service Detail/Pages/Sarana";
import SIM from "../../screens/Service Detail/Pages/SIM";
import Biro from "../../screens/Service Detail/Pages/Biro";
import Color from "../../utils/Color";

const ServiceDetail = ({ route }) => {
  const { id, title } = route.params;

  const renderContent = () => {
    switch (id) {
      case 1:
        return <Gaji />;
      case 2:
        return <History />;
      case 3:
        return <Ticketing />;
      case 4:
        return <Poliklinik />;
      case 5:
        return <Pendidikan />;
      case 6:
        return <Keuangan />;
      case 7:
        return <SDM />;
      case 8:
        return <Pengembangan />;
      case 9:
        return <Sarana />;
      case 10:
        return <SIM />;
      case 11:
        return <Biro />;

      default:
        return (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Color.White,
            }}
          >
            <Image
              source={Collection.Error}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>
        );
    }
  };

  return <View>{renderContent()}</View>;
};

export default ServiceDetail;
