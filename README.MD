# OpenAADLDataset

This folder contains the result of discovering, parsing and analyzing the source of models,which are not included in this repo.
The following folders are inside `from_local_repository` or `from_github_repository`. They contain the result of processing of local URIS models (those obtained through web crawling) and those obtained as a result of URIS from github.

1. The folder `output-processing` contains separated by folders the `aadl` models found by the process of discovering, the `xmi` folder contains the parsing and instantiation of those models. Also it has the .json of the logs.
2. The `result.csv` contains the output of the computations performed.
3. The `legends.csv` contains the metrics computed by the processing.
4. The `config.json` has the set of key-value pairs for the global config of the tool.
5. The `jupyter` folder has the notebook for the data processing phase. The `main_processing` folder contains the images and .pdf and .html of the previous notebook.
6. The `scripts` folder contains now the script for query the repository endpoint on github.
