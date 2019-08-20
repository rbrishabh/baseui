/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ThemeT} from '../styles/types.js';
import type {PrimitivesT} from './types.js';
import deepMerge from '../utils/deep-merge.js';

export default function createTheme(
  primitives: PrimitivesT,
  overrides?: {},
): ThemeT {
  const theme = {
    breakpoints: {
      small: 320,
      medium: 600,
      large: 1280,
    },

    colors: {
      // Primary Palette, Blue
      primary50: primitives.primary50,
      primary100: primitives.primary100,
      primary200: primitives.primary200,
      primary300: primitives.primary300,
      primary400: primitives.primary400,
      primary: primitives.primary400,
      primary500: primitives.primary500,
      primary600: primitives.primary600,
      primary700: primitives.primary700,

      // Negative Palette, Red
      negative50: primitives.negative50,
      negative100: primitives.negative100,
      negative200: primitives.negative200,
      negative300: primitives.negative300,
      negative400: primitives.negative400,
      negative: primitives.negative400,
      negative500: primitives.negative500,
      negative600: primitives.negative600,
      negative700: primitives.negative700,

      // Warning Palette, Orange
      warning50: primitives.warning50,
      warning100: primitives.warning100,
      warning200: primitives.warning200,
      warning300: primitives.warning300,
      warning400: primitives.warning400,
      warning: primitives.warning400,
      warning500: primitives.warning500,
      warning600: primitives.warning600,
      warning700: primitives.warning700,

      // Positive Palette, Green
      positive50: primitives.positive50,
      positive100: primitives.positive100,
      positive200: primitives.positive200,
      positive300: primitives.positive300,
      positive400: primitives.positive400,
      positive: primitives.positive400,
      positive500: primitives.positive500,
      positive600: primitives.positive600,
      positive700: primitives.positive700,

      // Monochrome Palette, Gray
      white: primitives.white,
      mono50: primitives.mono50,
      mono100: primitives.mono100,
      mono200: primitives.mono200,
      mono300: primitives.mono300,
      mono400: primitives.mono400,
      mono500: primitives.mono500,
      mono600: primitives.mono600,
      mono700: primitives.mono700,
      mono800: primitives.mono800,
      mono900: primitives.mono900,
      mono1000: primitives.mono1000,
      black: primitives.black,

      // Rating Palette, Yellow
      rating50: primitives.rating50,
      rating100: primitives.rating100,
      rating200: primitives.rating200,
      rating300: primitives.rating300,
      rating400: primitives.rating400,
      rating500: primitives.rating500,
      rating600: primitives.rating600,
      rating700: primitives.rating700,

      // Purple Palette
      purple50: primitives.purple50,
      purple100: primitives.purple100,
      purple200: primitives.purple200,
      purple300: primitives.purple300,
      purple400: primitives.purple400,
      purple500: primitives.purple500,
      purple600: primitives.purple600,
      purple700: primitives.purple700,

      // Brown Palette
      brown50: primitives.brown50,
      brown100: primitives.brown100,
      brown200: primitives.brown200,
      brown300: primitives.brown300,
      brown400: primitives.brown400,
      brown500: primitives.brown500,
      brown600: primitives.brown600,
      brown700: primitives.brown700,

      // Semantic Colors

      // Font Color
      colorPrimary: primitives.black,
      colorSecondary: primitives.mono600,

      // Background
      background: primitives.white,
      backgroundAlt: primitives.white,
      backgroundInv: primitives.black,

      // Foreground
      foreground: primitives.black,
      foregroundAlt: primitives.mono600,
      foregroundInv: primitives.white,

      // Borders
      border: primitives.mono300,
      borderAlt: primitives.mono400,
      borderFocus: primitives.black,
      borderError: primitives.negative400,

      // Buttons
      buttonDisabledText: primitives.mono400,
      buttonPrimaryFill: primitives.black,
      buttonPrimaryText: primitives.white,
      buttonPrimaryHover: primitives.mono700,
      buttonPrimaryActive: primitives.mono600,
      buttonPrimaryDisabledFill: primitives.mono50,
      buttonSecondaryFill: primitives.mono100,
      buttonSecondaryText: primitives.black,
      buttonSecondaryHover: primitives.mono200,
      buttonSecondaryActive: primitives.mono300,
      buttonSecondaryDisabledFill: primitives.mono50,
      buttonTertiaryFill: 'transparent',
      buttonTertiaryText: primitives.black,
      buttonTertiaryHover: primitives.mono50,
      buttonTertiaryActive: primitives.mono100,
      buttonTertiaryDisabledFill: 'transparent',
      // deprecated: to be removed
      buttonMinimalFill: 'transparent',
      buttonMinimalText: primitives.black,
      buttonMinimalHover: primitives.mono50,
      buttonMinimalActive: primitives.mono100,
      buttonMinimalDisabledFill: 'transparent',
      // deprecated: no longer in use
      buttonDisabledFill: primitives.mono100,
      buttonTertiarySelectedFill: primitives.primary400,
      buttonTertiarySelectedText: primitives.white,

      // Button Group
      buttonGroupSelectedFill: primitives.black,
      buttonGroupSelectedText: primitives.white,

      // Breadcrumbs
      breadcrumbsText: primitives.mono700,
      breadcrumbsSeparatorFill: primitives.mono500,

      // Datepicker
      // deprecated: no longer in use
      datepickerBackground: primitives.white,
      datepickerDayFont: primitives.black,
      datepickerDayFontDisabled: primitives.mono300,
      datepickerDayPseudoSelected: primitives.primary100,
      datepickerDayPseudoHighlighted: primitives.primary200,

      // Calendar
      calendarBackground: primitives.white,
      calendarForeground: primitives.black,
      calendarForegroundDisabled: primitives.mono300,
      calendarHeaderBackground: primitives.black,
      calendarHeaderForeground: primitives.white,
      calendarHeaderBackgroundActive: primitives.mono700,
      calendarHeaderForegroundDisabled: primitives.mono500,
      calendarDayBackgroundPseudoSelected: primitives.mono100,
      calendarDayForegroundPseudoSelected: primitives.black,
      calendarDayBackgroundPseudoSelectedHighlighted: primitives.mono200,
      calendarDayForegroundPseudoSelectedHighlighted: primitives.black,
      calendarDayBackgroundSelected: primitives.black,
      calendarDayForegroundSelected: primitives.white,
      calendarDayBackgroundSelectedHighlighted: primitives.mono700,
      calendarDayForegroundSelectedHighlighted: primitives.white,

      // FileUploader
      fileUploaderBackgroundColor: primitives.mono50,
      fileUploaderBackgroundColorActive: primitives.primary50,
      fileUploaderBorderColorActive: primitives.primary400,
      fileUploaderBorderColorDefault: primitives.mono300,
      fileUploaderMessageColor: primitives.mono400,

      // Links
      linkText: primitives.primary400,
      linkVisited: primitives.primary500,
      linkHover: primitives.primary600,
      linkActive: primitives.primary600,

      // Shadow
      shadowFocus: 'rgba(39, 110, 241, 0.32)',
      shadowError: 'rgba(229, 73, 55, 0.32)',

      // List
      listHeaderFill: primitives.white,
      listBodyFill: primitives.mono50,
      listIconFill: primitives.mono300,
      listBorder: primitives.mono300,

      // Accordian
      accordianHeaderBorder: primitives.mono200,
      accordianHeaderBorderExpanded: primitives.mono300,

      // ProgressSteps
      progressUncompletedLine: primitives.mono100,
      progressUncompletedNodeBackground: primitives.mono100,
      progressUncompletedNodeForeground: primitives.mono400,
      progressCompletedLine: primitives.black,
      progressCompletedNodeBackground: primitives.black,
      progressCompletedNodeForeground: primitives.white,
      progressActiveNodeBackground: primitives.black,
      progressActiveNodeForeground: primitives.white,
      // deprecated: no longer in use
      progressStepsIconActiveFill: primitives.primary100,

      // Tick
      tickFill: primitives.white,
      tickFillHover: primitives.mono50,
      tickFillActive: primitives.mono200,
      tickFillSelected: primitives.black,
      tickFillSelectedHover: primitives.mono600,
      tickFillSelectedHoverActive: primitives.mono700,
      tickFillError: primitives.negative50,
      tickFillErrorHover: primitives.negative100,
      tickFillErrorHoverActive: primitives.negative200,
      tickFillErrorSelected: primitives.negative400,
      tickFillErrorSelectedHover: primitives.negative500,
      tickFillErrorSelectedHoverActive: primitives.negative600,
      tickBorder: primitives.mono500,
      tickBorderError: primitives.negative400,
      tickMarkFill: primitives.white,
      tickMarkFillError: primitives.white,
      tickMarkFillDisabled: primitives.mono400,
      tickFillDisabled: primitives.mono100,

      // Slider/Toggle
      sliderFill: primitives.black,
      sliderFillDisabled: primitives.mono400,
      sliderTrackFill: primitives.mono200,
      sliderTrackFillHover: primitives.mono300,
      sliderTrackFillActive: primitives.mono400,
      sliderTrackFillDisabled: primitives.mono100,
      sliderHandleFill: primitives.white,
      sliderHandleBorder: primitives.mono200,
      sliderHandleInnerFill: primitives.mono200,
      sliderHandleInnerFillDisabled: primitives.mono200,
      sliderHandleInnerFillSelectedHover: primitives.mono600,
      sliderHandleInnerFillSelectedActive: primitives.mono700,
      // deprecated: no longer in use
      sliderTrackFillSelected: primitives.primary400,
      sliderTrackFillSelectedHover: primitives.primary400,
      sliderTrackFillSelectedActive: primitives.primary500,
      sliderHandleFillHover: primitives.white,
      sliderHandleFillActive: primitives.white,
      sliderHandleFillSelected: primitives.white,
      sliderHandleFillSelectedHover: primitives.white,
      sliderHandleFillSelectedActive: primitives.white,
      sliderHandleFillDisabled: primitives.mono300,
      sliderBorder: primitives.mono300,
      sliderBorderHover: primitives.primary400,
      sliderBorderDisabled: primitives.mono400,

      // Inputs
      inputFill: primitives.mono100,
      inputFillError: primitives.negative50,
      inputFillDisabled: primitives.mono50,
      inputFillActive: primitives.mono50,
      inputFillPositive: primitives.positive50,
      inputTextDisabled: primitives.mono400,
      inputBorderError: primitives.negative200,
      inputBorderPositive: primitives.positive200,
      inputEnhancerFill: primitives.mono200,
      inputEnhancerFillDisabled: primitives.mono100,
      inputEnhancerTextDisabled: primitives.mono400,

      // Menu
      menuFill: primitives.white,
      menuFillHover: primitives.mono50,
      menuFontDefault: primitives.mono600,
      menuFontDisabled: primitives.mono300,
      menuFontHighlighted: primitives.black,
      menuFontSelected: primitives.black,

      // Pagination
      paginationTriangleDown: primitives.mono600,

      // Header navigation
      headerNavigationFill: 'transparent',

      // Tab
      tabBarFill: primitives.mono50,
      tabColor: primitives.mono600,
      tabBorder: primitives.black,

      // Notification
      notificationPrimaryBackground: primitives.primary50,
      notificationPrimaryText: primitives.primary500,
      notificationPositiveBackground: primitives.positive50,
      notificationPositiveText: primitives.positive500,
      notificationWarningBackground: primitives.warning50,
      notificationWarningText: primitives.warning500,
      notificationNegativeBackground: primitives.negative50,
      notificationNegativeText: primitives.negative500,

      // Tag
      tagSolidRampUnit: '400',
      tagSolidHoverRampUnit: '50',
      tagSolidActiveRampUnit: '100',
      tagSolidDisabledRampUnit: '50',
      tagSolidFontRampUnit: '50',
      tagSolidFontHoverRampUnit: '500',
      tagLightRampUnit: '50',
      tagLightHoverRampUnit: '100',
      tagLightActiveRampUnit: '100',
      tagLightDisabledRampUnit: '50',
      tagLightFontRampUnit: '500',
      tagLightFontHoverRampUnit: '500',
      tagOutlinedRampUnit: '400',
      tagOutlinedHoverRampUnit: '500',
      tagOutlinedActiveRampUnit: '600',
      tagOutlinedDisabledRampUnit: '50',
      tagOutlinedFontRampUnit: '500',
      tagOutlinedFontHoverRampUnit: '50',
      tagFontDisabledRampUnit: '200',

      tagNeutralSolidBackground: primitives.mono700,
      tagNeutralSolidHover: primitives.mono100,
      tagNeutralSolidActive: primitives.mono200,
      tagNeutralSolidDisabled: primitives.mono50,
      tagNeutralSolidFont: primitives.white,
      tagNeutralSolidFontHover: primitives.mono700,
      tagNeutralLightBackground: primitives.mono100,
      tagNeutralLightHover: primitives.mono100,
      tagNeutralLightActive: primitives.mono200,
      tagNeutralLightDisabled: primitives.mono50,
      tagNeutralLightFont: primitives.mono700,
      tagNeutralLightFontHover: primitives.mono700,
      tagNeutralOutlinedBackground: primitives.mono700,
      tagNeutralOutlinedHover: primitives.mono600,
      tagNeutralOutlinedActive: primitives.mono700,
      tagNeutralOutlinedDisabled: primitives.mono50,
      tagNeutralOutlinedFont: primitives.mono700,
      tagNeutralOutlinedFontHover: primitives.mono50,
      tagNeutralFontDisabled: primitives.mono300,

      tagPrimarySolidBackground: primitives.primary400,
      tagPrimarySolidHover: primitives.primary50,
      tagPrimarySolidActive: primitives.primary100,
      tagPrimarySolidDisabled: primitives.primary50,
      tagPrimarySolidFont: primitives.primary50,
      tagPrimarySolidFontHover: primitives.primary500,
      tagPrimaryLightBackground: primitives.primary50,
      tagPrimaryLightHover: primitives.primary100,
      tagPrimaryLightActive: primitives.primary100,
      tagPrimaryLightDisabled: primitives.primary50,
      tagPrimaryLightFont: primitives.primary500,
      tagPrimaryLightFontHover: primitives.primary500,
      tagPrimaryOutlinedBackground: primitives.primary400,
      tagPrimaryOutlinedHover: primitives.primary500,
      tagPrimaryOutlinedActive: primitives.primary600,
      tagPrimaryOutlinedDisabled: primitives.primary50,
      tagPrimaryOutlinedFont: primitives.primary500,
      tagPrimaryOutlinedFontHover: primitives.primary50,
      tagPrimaryFontDisabled: primitives.primary200,

      tagPositiveSolidBackground: primitives.positive400,
      tagPositiveSolidHover: primitives.positive50,
      tagPositiveSolidActive: primitives.positive100,
      tagPositiveSolidDisabled: primitives.positive50,
      tagPositiveSolidFont: primitives.positive50,
      tagPositiveSolidFontHover: primitives.positive500,
      tagPositiveLightBackground: primitives.positive50,
      tagPositiveLightHover: primitives.positive100,
      tagPositiveLightActive: primitives.positive100,
      tagPositiveLightDisabled: primitives.positive50,
      tagPositiveLightFont: primitives.positive500,
      tagPositiveLightFontHover: primitives.positive500,
      tagPositiveOutlinedBackground: primitives.positive400,
      tagPositiveOutlinedHover: primitives.positive500,
      tagPositiveOutlinedActive: primitives.positive600,
      tagPositiveOutlinedDisabled: primitives.positive50,
      tagPositiveOutlinedFont: primitives.positive500,
      tagPositiveOutlinedFontHover: primitives.positive50,
      tagPositiveFontDisabled: primitives.positive200,

      tagWarningSolidBackground: primitives.warning400,
      tagWarningSolidHover: primitives.warning50,
      tagWarningSolidActive: primitives.warning100,
      tagWarningSolidDisabled: primitives.warning50,
      tagWarningSolidFont: primitives.warning50,
      tagWarningSolidFontHover: primitives.warning500,
      tagWarningLightBackground: primitives.warning50,
      tagWarningLightHover: primitives.warning100,
      tagWarningLightActive: primitives.warning100,
      tagWarningLightDisabled: primitives.warning50,
      tagWarningLightFont: primitives.warning500,
      tagWarningLightFontHover: primitives.warning500,
      tagWarningOutlinedBackground: primitives.warning400,
      tagWarningOutlinedHover: primitives.warning500,
      tagWarningOutlinedActive: primitives.warning600,
      tagWarningOutlinedDisabled: primitives.warning50,
      tagWarningOutlinedFont: primitives.warning500,
      tagWarningOutlinedFontHover: primitives.warning50,
      tagWarningFontDisabled: primitives.warning200,

      tagNegativeSolidBackground: primitives.negative400,
      tagNegativeSolidHover: primitives.negative50,
      tagNegativeSolidActive: primitives.negative100,
      tagNegativeSolidDisabled: primitives.negative50,
      tagNegativeSolidFont: primitives.negative50,
      tagNegativeSolidFontHover: primitives.negative500,
      tagNegativeLightBackground: primitives.negative50,
      tagNegativeLightHover: primitives.negative100,
      tagNegativeLightActive: primitives.negative100,
      tagNegativeLightDisabled: primitives.negative50,
      tagNegativeLightFont: primitives.negative500,
      tagNegativeLightFontHover: primitives.negative500,
      tagNegativeOutlinedBackground: primitives.negative400,
      tagNegativeOutlinedHover: primitives.negative500,
      tagNegativeOutlinedActive: primitives.negative600,
      tagNegativeOutlinedDisabled: primitives.negative50,
      tagNegativeOutlinedFont: primitives.negative500,
      tagNegativeOutlinedFontHover: primitives.negative50,
      tagNegativeFontDisabled: primitives.negative200,

      // Table
      tableHeadBackgroundColor: primitives.white,
      tableBackground: primitives.white,
      tableStripedBackground: primitives.mono50,
      tableFilter: primitives.mono400,
      tableFilterHeading: primitives.mono500,
      tableFilterBackground: primitives.white,
      tableFilterFooterBackground: primitives.mono50,

      // Toast
      toastText: primitives.white,
      toastPrimaryBackground: primitives.primary500,
      toastPositiveBackground: primitives.positive500,
      toastWarningBackground: primitives.warning500,
      toastNegativeBackground: primitives.negative500,

      // Spinner
      spinnerTrackFill: primitives.mono700,

      // Progress bar
      progressbarTrackFill: primitives.mono700,

      // Tooltip
      tooltipBackground: primitives.mono700,
      tooltipText: primitives.white,

      // Avatar
      avatarForeground: primitives.white,

      // Toggle
      toggleBackground: primitives.white,

      // Rating
      ratingStarStroke: primitives.mono300,
      ratingStarFill: primitives.mono100,

      // Modal
      modalFooterBorder: primitives.mono200,

      // Emoticon
      emoticonFill: primitives.mono300,
    },
    typography: {
      font100: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: '20px',
      },
      font150: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '12px',
        fontWeight: '500',
        lineHeight: '20px',
      },
      font200: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: '20px',
      },
      font250: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
      },
      font300: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '16px',
        fontWeight: 'normal',
        lineHeight: '24px',
      },
      font350: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
      },
      font400: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '18px',
        fontWeight: 'normal',
        lineHeight: '28px',
      },
      font450: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '28px',
      },
      // deprecated, maintained for backward compatibility, may be removed in the future
      font460: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '18px',
        fontWeight: 'normal',
        lineHeight: '24px',
      },
      // deprecated, maintained for backward compatibility, may be removed in the future
      font470: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '24px',
      },
      font550: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '28px',
      },
      font650: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '24px',
        fontWeight: 500,
        lineHeight: '32px',
      },
      font750: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '28px',
        fontWeight: 500,
        lineHeight: '36px',
      },
      font850: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '32px',
        fontWeight: 500,
        lineHeight: '40px',
      },
      font950: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '36px',
        fontWeight: 500,
        lineHeight: '44px',
      },
      font1050: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '40px',
        fontWeight: 500,
        lineHeight: '52px',
      },
      font1150: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '36px',
        fontWeight: 500,
        lineHeight: '44px',
      },
      font1250: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '44px',
        fontWeight: 500,
        lineHeight: '52px',
      },
      font1350: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '52px',
        fontWeight: 500,
        lineHeight: '64px',
      },
      font1450: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '96px',
        fontWeight: 500,
        lineHeight: '112px',
      },
    },
    sizing: {
      scale0: '2px',
      scale100: '4px',
      scale200: '6px',
      scale300: '8px',
      scale400: '10px',
      scale500: '12px',
      scale550: '14px',
      scale600: '16px',
      scale650: '18px',
      scale700: '20px',
      scale750: '22px',
      scale800: '24px',
      scale900: '32px',
      scale1000: '40px',
      scale1200: '48px',
      scale1400: '56px',
      scale1600: '64px',
      scale2400: '96px',
      scale3200: '128px',
      scale4800: '192px',
    },
    lighting: {
      shadow400: '0 1px 4px hsla(0, 0%, 0%, 0.16)',
      shadow500: '0 2px 8px hsla(0, 0%, 0%, 0.16)',
      shadow600: '0 4px 16px hsla(0, 0%, 0%, 0.16)',
      shadow700: '0 8px 24px hsla(0, 0%, 0%, 0.16)',
      overlay0: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0)',
      overlay100: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.04)',
      overlay200: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.08)',
      overlay300: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.12)',
      overlay400: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.16)',
      overlay500: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.2)',
      overlay600: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.24)',
    },
    borders: {
      border100: {
        borderColor: 'hsla(0, 0%, 0%, 0.04)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border200: {
        borderColor: 'hsla(0, 0%, 0%, 0.08)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border300: {
        borderColor: 'hsla(0, 0%, 0%, 0.12)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border400: {
        borderColor: 'hsla(0, 0%, 0%, 0.16)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border500: {
        borderColor: 'hsla(0, 0%, 0%, 0.2)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border600: {
        borderColor: 'hsla(0, 0%, 0%, 0.24)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      radius100: '2px',
      radius200: '4px',
      radius300: '8px',
      radius400: '12px',
      /** Checkbox, Datepicker (Range), Progress Bar, Slider, Tag */
      useRoundedCorners: true,
      /** Button, ButtonGroup */
      buttonBorderRadius: '0px',
      /** Input, Select, Textarea */
      inputBorderRadius: '0px',
      /** Popover, Menu, Tooltip */
      popoverBorderRadius: '0px',
      /** Card, Datepicker, Modal, Toast, Notification */
      surfaceBorderRadius: '0px',
    },
    animation: {
      timing100: '0.25s',
      timing400: '0.4s',
      timing700: '0.6s',
      easeOutCurve: 'cubic-bezier(.2, .8, .4, 1)',
      easeInCurve: 'cubic-bezier(.8, .2, .6, 1)',
      easeInOutCurve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    direction: 'auto',
    zIndex: {
      modal: 2000,
    },
  };

  // to remove the FlowFixMe, we have to make deepMerge accept a ThemeT
  // $FlowFixMe
  return deepMerge(theme, overrides);
}
