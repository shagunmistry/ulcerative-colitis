export type DataType = "images" | "gene-expression" | "microbiome" | "clinical" | "other";
export type Access = "open" | "registration" | "application" | "not-stated";

export interface Copy {
  host: "Hugging Face" | "Kaggle";
  /** repository id on that host, as owner/name */
  id: string;
  /** true only when the dataset's host or paper names this copy as the release */
  original: boolean;
  /** how the copy differs from the release */
  note?: string;
  checkedOn: string;
}

export interface Dataset {
  id: string;
  title: string;
  publisher: string;
  url: string;
  /** page stating the terms of use; absent when none is published */
  termsUrl?: string;
  summary: string;
  types: DataType[];
  size: string;
  /** licence of the original release, never of a copy */
  licence: string;
  access: Access;
  accessNote?: string;
  citation: string;
  topics: string[];
  copies: Copy[];
  /** date the details were last read on the host's own pages */
  checkedOn: string;
}

export const NOT_STATED = "Not stated";

const CHECKED = "2026-11-25";

const copy = (host: Copy["host"], id: string, note?: string): Copy => ({
  host,
  id,
  original: false,
  note,
  checkedOn: CHECKED,
});

interface Series {
  accession: string;
  title: string;
  summary: string;
  samples: number;
  /** size and name of the main file, as listed in the series' download directory */
  file: string;
  paper: string;
}

/** A gene expression series on NCBI's Gene Expression Omnibus (GEO). */
const geo = ({ accession, title, summary, samples, file, paper }: Series): Dataset => {
  const url = `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${accession}`;
  return {
    id: accession.toLowerCase(),
    title: `${accession}: ${title}`,
    publisher: "NCBI Gene Expression Omnibus",
    url,
    termsUrl: "https://www.ncbi.nlm.nih.gov/home/about/policies/",
    summary,
    types: ["gene-expression"],
    size: `${samples} samples; ${file}`,
    licence: NOT_STATED,
    access: "open",
    accessNote:
      "The record is marked public. NCBI says it places no restrictions of its own on use or distribution, but that submitters may claim rights in the data.",
    citation: `${paper} Data: GEO series ${accession}.`,
    topics: ["data"],
    copies: [],
    checkedOn: CHECKED,
  };
};

export const DATASETS: Dataset[] = [
  {
    id: "limuc",
    title: "LIMUC: scored colonoscopy images",
    publisher: "Zenodo",
    url: "https://zenodo.org/records/5827695",
    termsUrl: "https://zenodo.org/records/5827695",
    summary:
      "Colonoscopy images from people with ulcerative colitis, collected at Marmara University School of Medicine and graded by gastroenterologists with the Mayo endoscopic score.",
    types: ["images"],
    size: "11,276 images from 564 patients; 3.8 GB",
    licence: "CC BY 4.0",
    access: "open",
    citation:
      "Polat G, Kani HT, Ergenc I, Ozen Alahdab Y, Temizel A, Atug O. Labeled Images for Ulcerative Colitis (LIMUC) Dataset. Zenodo, 2022. https://doi.org/10.5281/zenodo.5827695. The authors also ask users to acknowledge https://doi.org/10.1093/ibd/izac226 and their paper in Medical Image Understanding and Analysis (2022), pages 157-171.",
    topics: ["data"],
    copies: [
      copy(
        "Hugging Face",
        "chehablab/LIMUC",
        "Images converted from BMP to PNG, in a single train split; the authors' test set is not separate.",
      ),
    ],
    checkedOn: CHECKED,
  },
  {
    id: "ibdmdb",
    title: "IBDMDB: inflammatory bowel disease multi-omics data",
    publisher: "IBDMDB",
    url: "https://ibdmdb.org/results",
    summary:
      "Results and data files from studies of the gut microbes and their hosts in inflammatory bowel disease, including DNA and RNA sequencing, metabolites, proteins and viruses.",
    types: ["microbiome", "gene-expression", "other"],
    size: NOT_STATED,
    licence: NOT_STATED,
    access: "not-stated",
    accessNote:
      "The site has a download page and its home page says the data will be made publicly available. We found no page of terms of use.",
    citation: NOT_STATED,
    topics: ["data", "butyrate"],
    copies: [],
    checkedOn: CHECKED,
  },
  {
    id: "hyperkvasir",
    title: "HyperKvasir: gut endoscopy images and videos",
    publisher: "Open Science Framework",
    url: "https://osf.io/mh9sj/",
    termsUrl: "https://osf.io/mh9sj/wiki/home/",
    summary:
      "Images and videos from stomach and bowel examinations at a hospital in Norway, partly labelled by endoscopists. It covers many findings, only some of them ulcerative colitis.",
    types: ["images"],
    size: "110,079 images and 374 videos",
    licence: "CC BY 4.0",
    access: "open",
    accessNote:
      'The authors\' code repository (https://github.com/simula/hyper-kvasir) says: "The data is released fully open for research and educational purposes. The use of the dataset for purposes such as competitions and commercial purposes needs prior written permission." This differs from the CC BY 4.0 licence shown here. Ask the authors before such use.',
    citation:
      'Borgli H, Thambawita V, Smedsrud PH, et al. "HyperKvasir, a comprehensive multi-class image and video dataset for gastrointestinal endoscopy". Scientific Data 7, 283 (2020). https://doi.org/10.1038/s41597-020-00622-y',
    topics: ["data"],
    copies: [
      copy(
        "Hugging Face",
        "chehablab/HyperKvasirDataset",
        "Only the 10,662 labelled images, not the full 110,079 images and 374 videos.",
      ),
      copy("Kaggle", "kelkalot/the-hyper-kvasir-dataset"),
    ],
    checkedOn: CHECKED,
  },
  geo({
    accession: "GSE109142",
    title: "rectal gene expression in children newly diagnosed with UC",
    summary:
      "RNA sequencing of rectal biopsies from children newly diagnosed with ulcerative colitis, taken before treatment, and from children without ulcerative colitis as controls.",
    samples: 226,
    file: "66M raw archive",
    paper:
      "Haberman Y, Karns R, Dexheimer PJ, et al. Ulcerative colitis mucosal transcriptomes reveal mitochondriopathy and personalized mechanisms underlying disease severity and treatment response. Nat Commun. 2019;10:38. https://doi.org/10.1038/s41467-018-07841-3.",
  }),
  geo({
    accession: "GSE73661",
    title: "colon gene expression during vedolizumab and infliximab treatment",
    summary:
      "Microarray data from colon biopsies of people with ulcerative colitis before and during treatment with vedolizumab or infliximab, with comparison biopsies from people without inflammatory bowel disease.",
    samples: 178,
    file: "732M raw archive",
    paper:
      "Arijs I, De Hertogh G, Lemmens B, et al. Effect of vedolizumab (anti-α4β7-integrin) therapy on histological healing and mucosal gene expression in patients with UC. Gut. 2018;67:43-52. https://doi.org/10.1136/gutjnl-2016-312293.",
  }),
  geo({
    accession: "GSE92415",
    title: "colon gene expression during golimumab treatment",
    summary:
      "Microarray data from colon biopsies of people with ulcerative colitis in a golimumab induction trial (PURSUIT-SC), and of healthy people.",
    samples: 183,
    file: "417M raw archive",
    paper:
      "Sandborn WJ, Feagan BG, Marano C, et al. Subcutaneous golimumab induces clinical response and remission in patients with moderate-to-severe ulcerative colitis. Gastroenterology. 2014;146:85-95. https://doi.org/10.1053/j.gastro.2013.05.048.",
  }),
  geo({
    accession: "GSE206285",
    title: "colon gene expression before ustekinumab or placebo",
    summary:
      "Microarray data from colon biopsies taken at the start of an ustekinumab trial (UNIFI) from people with moderate to severe ulcerative colitis, and from healthy people.",
    samples: 568,
    file: "1.1G raw archive",
    paper:
      "Pavlidis P, Tsakmaki A, Pantazi E, et al. Interleukin-22 regulates neutrophil recruitment in ulcerative colitis and is associated with resistance to ustekinumab therapy. Nat Commun. 2022;13:5820. https://doi.org/10.1038/s41467-022-33331-8.",
  }),
  geo({
    accession: "GSE75214",
    title: "gut lining gene expression in UC and Crohn's disease",
    summary:
      "Microarray data from biopsies of the colon and end of the small bowel from people with ulcerative colitis or Crohn's disease, and from people without either.",
    samples: 194,
    file: "803M raw archive",
    paper:
      "Vancamelbeke M, Vanuytsel T, Farré R, et al. Genetic and Transcriptomic Bases of Intestinal Epithelial Barrier Dysfunction in Inflammatory Bowel Disease. Inflamm Bowel Dis. 2017;23:1718-1729. https://doi.org/10.1097/MIB.0000000000001246.",
  }),
];

const COPY_BASE: Record<Copy["host"], string> = {
  "Hugging Face": "https://huggingface.co/datasets/",
  Kaggle: "https://www.kaggle.com/datasets/",
};

export const copyUrl = (copy: Copy) => `${COPY_BASE[copy.host]}${copy.id}`;

export const loadSnippet = (copy: Copy) =>
  copy.host === "Hugging Face"
    ? `from datasets import load_dataset\n\nds = load_dataset("${copy.id}")`
    : `import kagglehub\n\npath = kagglehub.dataset_download("${copy.id}")`;

export function filterDatasets(list: Dataset[], by: { type?: DataType; access?: Access }): Dataset[] {
  return list.filter(
    (d) => (!by.type || d.types.includes(by.type)) && (!by.access || d.access === by.access),
  );
}
