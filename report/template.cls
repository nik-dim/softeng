\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{altacv}[2018/09/13 NikDim template for LaTeX reports]


\LoadClass{article}

% REQUIRED PACKAGES
\RequirePackage[margin=2cm]{geometry}
\RequirePackage{fontawesome}
\RequirePackage[utf8]{inputenc}
\RequirePackage[greek, english]{babel}
\RequirePackage{alphabeta}
\RequirePackage{xcolor}

\RequirePackage{array}
\RequirePackage[unicode]{hyperref}
\hypersetup{
	colorlinks,
	citecolor = black,
	filecolor = black,
	linkcolor = black,
	urlcolor = black
}
\RequirePackage[parfill]{parskip}
\RequirePackage{bookmark}
\RequirePackage{algorithm}
\RequirePackage[noend]{algpseudocode}
\RequirePackage{fancyhdr}
\RequirePackage[nice]{nicefrac}
\RequirePackage[framed,numbered]{matlab-prettifier}



\colorlet{accent}{blue!70!black}
\colorlet{heading}{black}
\colorlet{emphasis}{black}
\colorlet{body}{black!80!white}

\RequirePackage{tikz}
\usetikzlibrary{arrows}
\RequirePackage[skins]{tcolorbox}
\RequirePackage{enumitem}
\setlist{leftmargin=*,labelsep=0.5em,nosep,itemsep=0.25\baselineskip,after=\vskip0.25\baselineskip}
\setlist[itemize]{label=\itemmarker}
\RequirePackage{graphicx}
\RequirePackage{etoolbox}
\RequirePackage{dashrule}
\RequirePackage{multirow,tabularx}
\RequirePackage{changepage}
\RequirePackage{titlesec}
\RequirePackage{xstring}
\RequirePackage{datetime}
% \RequirePackage{marginfix}

%
%
%	COMMANDS
%
%
\newcommand{\classname}[1]{\def\@classname{#1}}

\newcommand{\maketitlepage}
{
	\begin{titlepage}
		\centering
		\vspace*{0.5 cm}
		\includegraphics[scale = 0.3]{emp.jpg}\\[1.0 cm]	% University Logo
		\textsc{\huge \@classname}\\[0.5 cm]				% Course Code
		\rule{\linewidth}{0.2 mm} \\[0.4 cm]
		{ \huge \bfseries \@title}\\
		\rule{\linewidth}{0.2 mm} \\[1.5 cm]
		{ \huge \@author}
		\vfill
		{\large \greekdate}
	\end{titlepage}
}

\newcommand{\greekmonth}[1]{%
	\IfEqCase{#1}{%
		{1}{Ιανουαρίου}%
		{2}{Φεβρουαρίου}%
		{3}{Μαρτίου}%
		{4}{Απρλίου}%
		{5}{Μαϊου}%
		{6}{Ιουνίου}%
		{7}{Ιουλίου}%
		{8}{Αυγούστου}%
		{9}{Σεπτεμβρίου}%
		{10}{Οκτωμβρίου}%
		{11}{Νοεμβρίου}%
		{12}{Δεκεμβρίου}%
	}[\PackageError{greekmonth}{Undefined option to tree: #1}{}]%
}%
\newcommand{\greekdate}{\the\day \hspace{0.1cm} \greekmonth{\the\month} \the\year}

\titleformat{\section}         % Customise the \section command 
{\Large\raggedright\bfseries} % Make the \section headers large (\Large),
% small capitals (\scshape) and left aligned (\raggedright)
{\thesection}{1em}                      % Can be used to give a prefix to all sections, like 'Section ...'
{}                           % Can be used to insert code before the heading
[\titlerule]                 % Inserts a horizontal line after the heading

\AtBeginDocument{%
  \pagestyle{empty}
  \color{body}
  \raggedright
}
