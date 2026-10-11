import vocabulary from '../data/vocabulary.json';
import sentences from '../data/sentences.json';
import idioms from '../data/idioms.json';
import phoneme from '../data/phoneme_description.json';
import introduction from '../data/introduction.json';
import llmOverlay from '../data/llm-translations.json';

export type Row = Record<string, string>;

export const vocabRows = vocabulary as unknown as Row[];
export const sentenceRows = sentences as unknown as Row[];
export const idiomRows = idioms as unknown as Row[];
export const phonemeRows = phoneme as unknown as Row[];
export const introductionRows = introduction as unknown as Row[];

/**
 * kind 决定该列的排版语言 —— 由数据性质决定，不是装饰：
 *   transcribe  罗马字/拼写/音标 → 等宽（逐字母精读的对象）
 *   char        单个汉字 → 宋体放大（语料的主角）
 *   cjk         汉字词组/标签 → 宋体常规
 *   gloss       短的外文原文（法/越） → 斜体衬线（引文性质）
 *   prose       整段原文 → 常规衬线（斜体段落难读）
 *   mt          机器译文 → 宋体 + 溯源色点
 *   meta        索引/页码/备注 → 小号等宽
 */
export type ColKind =
  'transcribe' | 'char' | 'cjk' | 'gloss' | 'prose' | 'mt' | 'meta';

export type ColumnDef = {
  key: string;
  i18n: string;
  visible: boolean;
  kind: ColKind;
  prov?: 'google' | 'deepl' | 'llm' | 'human';
};

// ── 词表：默认收起全部机翻列，只留 LLM 译文（既定方向） ──
export const vocabColumns: ColumnDef[] = [
  {
    key: 'Original Text',
    i18n: 'originalText',
    visible: true,
    kind: 'transcribe',
  },
  {
    key: 'Jyutping++',
    i18n: 'jyutpingPlusPlus',
    visible: true,
    kind: 'transcribe',
  },
  { key: 'Corres. Char.', i18n: 'corresChar', visible: true, kind: 'char' },
  {
    key: 'Original French Text',
    i18n: 'originalFrenchText',
    visible: true,
    kind: 'gloss',
  },
  {
    key: 'Original Vietnamese Text',
    i18n: 'originalVietnameseText',
    visible: true,
    kind: 'gloss',
  },
  { key: 'Note', i18n: 'note', visible: true, kind: 'meta' },
  {
    key: 'French (Google Trans.)',
    i18n: 'frenchGoogleTrans',
    visible: false,
    kind: 'mt',
    prov: 'google',
  },
  {
    key: 'French (Trans. Corr.)',
    i18n: 'frenchTransCorr',
    visible: false,
    kind: 'mt',
    prov: 'human',
  },
  {
    key: 'Vietnamese (Google Trans.)',
    i18n: 'vietnameseGoogleTrans',
    visible: false,
    kind: 'mt',
    prov: 'google',
  },
  {
    key: 'Vietnamese (Trans. Corr.)',
    i18n: 'vietnameseTransCorr',
    visible: false,
    kind: 'mt',
    prov: 'human',
  },
  { key: 'Index', i18n: 'index', visible: false, kind: 'meta' },
  { key: 'PDF Page', i18n: 'pdfPage', visible: false, kind: 'meta' },
  { key: 'Original Page', i18n: 'originalPage', visible: false, kind: 'meta' },
];

// 通用规则：默认收起书目性字段（序号/PDF 页码/原书页码），只留语言学内容
const refCols = (opts: { pdf?: boolean } = {}): ColumnDef[] => [
  { key: 'Index', i18n: 'index', visible: false, kind: 'meta' },
  ...(opts.pdf
    ? [
        {
          key: 'PDF Page',
          i18n: 'pdfPage',
          visible: false,
          kind: 'meta',
        } as ColumnDef,
      ]
    : []),
  { key: 'Original Page', i18n: 'originalPage', visible: false, kind: 'meta' },
];

export const introductionColumns: ColumnDef[] = [
  ...refCols(),
  { key: 'Original Text', i18n: 'originalText', visible: true, kind: 'prose' },
  {
    key: 'LLM Trans.',
    i18n: 'llmTrans',
    visible: true,
    kind: 'mt',
    prov: 'llm',
  },
  {
    key: 'Google Trans.',
    i18n: 'googleTrans',
    visible: false,
    kind: 'mt',
    prov: 'google',
  },
  {
    key: 'DeepL Trans.',
    i18n: 'deepLTrans',
    visible: false,
    kind: 'mt',
    prov: 'deepl',
  },
];

export const phonemeColumns: ColumnDef[] = [
  ...refCols(),
  { key: 'Presumptions', i18n: 'presumptions', visible: true, kind: 'cjk' },
  { key: 'Spellings', i18n: 'spellings', visible: true, kind: 'transcribe' },
  { key: 'Descriptions', i18n: 'descriptions', visible: true, kind: 'gloss' },
  {
    key: 'LLM Trans.',
    i18n: 'llmTrans',
    visible: true,
    kind: 'mt',
    prov: 'llm',
  },
  {
    key: 'DeepL Trans.',
    i18n: 'deepLTrans',
    visible: false,
    kind: 'mt',
    prov: 'deepl',
  },
  {
    key: 'Language Analogues',
    i18n: 'languageAnalogues',
    visible: true,
    kind: 'gloss',
  },
  {
    key: 'Example Words',
    i18n: 'exampleWords',
    visible: true,
    kind: 'transcribe',
  },
];

export const sentenceColumns: ColumnDef[] = [
  ...refCols({ pdf: true }),
  {
    key: 'Original French Text',
    i18n: 'originalFrenchText',
    visible: true,
    kind: 'gloss',
  },
  {
    key: 'LLM Trans.',
    i18n: 'llmTrans',
    visible: true,
    kind: 'mt',
    prov: 'llm',
  },
  {
    key: 'DeepL Trans.',
    i18n: 'deepLTrans',
    visible: false,
    kind: 'mt',
    prov: 'deepl',
  },
  {
    key: 'Original Text',
    i18n: 'originalText',
    visible: true,
    kind: 'transcribe',
  },
  { key: 'Corres. Char.', i18n: 'corresChar', visible: true, kind: 'cjk' },
  {
    key: 'Jyutping++',
    i18n: 'jyutpingPlusPlus',
    visible: true,
    kind: 'transcribe',
  },
  {
    key: 'Jyutping++ (Tokenized)',
    i18n: 'jyutpingPlusPlusTokenized',
    visible: true,
    kind: 'transcribe',
  },
  { key: 'Note', i18n: 'note', visible: true, kind: 'meta' },
];

export const idiomColumns: ColumnDef[] = [
  ...refCols({ pdf: true }),
  {
    key: 'Original French Text',
    i18n: 'originalFrenchText',
    visible: true,
    kind: 'gloss',
  },
  {
    key: 'LLM Trans.',
    i18n: 'llmTrans',
    visible: true,
    kind: 'mt',
    prov: 'llm',
  },
  {
    key: 'DeepL Trans.',
    i18n: 'deepLTrans',
    visible: false,
    kind: 'mt',
    prov: 'deepl',
  },
  {
    key: 'Original Text',
    i18n: 'originalText',
    visible: true,
    kind: 'transcribe',
  },
  { key: 'Corres. Char.', i18n: 'corresChar', visible: true, kind: 'cjk' },
  {
    key: 'Jyutping++',
    i18n: 'jyutpingPlusPlus',
    visible: true,
    kind: 'transcribe',
  },
  { key: 'Note', i18n: 'note', visible: true, kind: 'meta' },
];

/** LLM 译文从 overlay 读取（按 locale + 数据集 + Index） */
export function cellValue(
  row: Row,
  key: string,
  locale: string,
  ds: string,
): string {
  if (key === 'LLM Trans.') {
    const overlay = llmOverlay as {
      en: Record<string, Record<string, string>>;
      yue: Record<string, Record<string, string>>;
    };
    const set = (locale === 'yue' ? overlay.yue : overlay.en)[ds];
    return set?.[String(row['Index'])] ?? '';
  }
  return row[key] || '';
}

/** 各数据集页面清单（供 [section].astro 的 getStaticPaths 使用） */
export const SECTIONS = [
  {
    slug: 'introduction',
    titleKey: 'introduction',
    rows: introductionRows,
    columns: introductionColumns,
  },
  {
    slug: 'phoneme_description',
    titleKey: 'phonemeDescription',
    rows: phonemeRows,
    columns: phonemeColumns,
  },
  {
    slug: 'sentences',
    titleKey: 'sentences',
    rows: sentenceRows,
    columns: sentenceColumns,
  },
  {
    slug: 'idioms',
    titleKey: 'idioms',
    rows: idiomRows,
    columns: idiomColumns,
  },
] as const;
