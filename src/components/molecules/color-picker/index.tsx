import React from "react";
import Select from "../../atoms/form/select";
import { Grid } from "@material-ui/core";
import RoundBox from "components/atoms/round-box";
import useTranslations from "translations";

interface Props {
  name: string;
  selected: string;
  onChange: Function;
}

const ColorPicker = ({ name, selected, onChange }: Props): JSX.Element => {
  const { t } = useTranslations();

  const options = [
    {
      id: "#DE60D4",
      name: t("Pink"),
    },
    {
      id: "#941e8a",
      name: t("Dark Pink"),
    },
    {
      id: "#ff0000",
      name: t("Red"),
    },
    {
      id: "#991f00",
      name: t("Dark Red"),
    },
    {
      id: "#00ff00",
      name: t("Green"),
    },
    {
      id: "#003300",
      name: t("Dark Green"),
    },
    {
      id: "#0099ff",
      name: t("Blue"),
    },
    {
      id: "#008fb3",
      name: t("Dark Blue"),
    },
    {
      id: "#00ffff",
      name: t("Aqua"),
    },
    {
      id: "#ffff4d",
      name: t("Yellow"),
    },
    {
      id: "#f98f83",
      name: t("Orange"),
    },
    {
      id: "#996633",
      name: t("Brown"),
    },
    {
      id: "#a6a6a6",
      name: t("Gray"),
    },
  ];

  const renderOptions = options.map((option: any, index: number) => {
    return {
      id: option.id,
      value: (
        <Grid container alignItems="center" spacing={1} key={index}>
          <Grid item>
            <RoundBox color={option.id} width={20} height={20} />
          </Grid>
          <Grid item>{option.name}</Grid>
        </Grid>
      ),
    };
  });

  return (
    <Select
      options={renderOptions}
      onChange={onChange}
      selected={selected}
      label={"Color"}
      name={name}
    />
  );
};

export default ColorPicker;
