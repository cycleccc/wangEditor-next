/**
 * @description header entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'
import {
  renderHeader1Conf,
  renderHeader2Conf,
  renderHeader3Conf,
  renderHeader4Conf,
  renderHeader5Conf,
  renderHeader6Conf,
} from './render-elem'
import {
  HeaderSelectMenuConf,
  Header1ButtonMenuConf,
  Header2ButtonMenuConf,
  Header3ButtonMenuConf,
  Header4ButtonMenuConf,
  Header5ButtonMenuConf,
  Header6ButtonMenuConf,
} from './menu/index'
import {
  header1ToHtmlConf,
  header2ToHtmlConf,
  header3ToHtmlConf,
  header4ToHtmlConf,
  header5ToHtmlConf,
  header6ToHtmlConf,
} from './elem-to-html'
import {
  parseHeader1HtmlConf,
  parseHeader2HtmlConf,
  parseHeader3HtmlConf,
  parseHeader4HtmlConf,
  parseHeader5HtmlConf,
  parseHeader6HtmlConf,
} from './parse-elem-html'
import withHeader from './plugin'

const header: Partial<IModuleConf> = {
  renderElems: [
    renderHeader1Conf,
    renderHeader2Conf,
    renderHeader3Conf,
    renderHeader4Conf,
    renderHeader5Conf,
    renderHeader6Conf,
  ],
  elemsToHtml: [
    header1ToHtmlConf,
    header2ToHtmlConf,
    header3ToHtmlConf,
    header4ToHtmlConf,
    header5ToHtmlConf,
    header6ToHtmlConf,
  ],
  parseElemsHtml: [
    parseHeader1HtmlConf,
    parseHeader2HtmlConf,
    parseHeader3HtmlConf,
    parseHeader4HtmlConf,
    parseHeader5HtmlConf,
    parseHeader6HtmlConf,
  ],
  menus: [
    HeaderSelectMenuConf,
    Header1ButtonMenuConf,
    Header2ButtonMenuConf,
    Header3ButtonMenuConf,
    Header4ButtonMenuConf,
    Header5ButtonMenuConf,
    Header6ButtonMenuConf,
  ],
  editorPlugin: withHeader,
}

export default header
