// ==========================================
// OPENPDF - PDF TOOLKIT
// Plain HTML + CSS + JavaScript
// ==========================================


// Wait until the page is completely loaded
document.addEventListener("DOMContentLoaded", () => {

    console.log("OpenPDF JavaScript loaded");


    // Check whether PDF-LIB loaded
    if (typeof PDFLib === "undefined") {

        alert(
            "PDF library could not load.\n\n" +
            "Please check your internet connection and reload the page."
        );

        return;
    }


    console.log("PDF-LIB loaded successfully");


    // PDF-LIB objects
    window.PDFDocument = PDFLib.PDFDocument;
    window.degrees = PDFLib.degrees;
    window.rgb = PDFLib.rgb;
    window.StandardFonts = PDFLib.StandardFonts;


    // Current tool
    window.currentTool = "";

    // Selected files
    window.selectedFiles = [];


    // ==========================================
    // TOOL INFORMATION
    // ==========================================

    const toolInformation = {

        merge: {
            title: "Merge PDF",
            description:
                "Combine multiple PDF files into one PDF.",
            accept: ".pdf",
            multiple: true
        },

        split: {
            title: "Split PDF",
            description:
                "Extract selected pages from a PDF.",
            accept: ".pdf",
            multiple: false
        },

        rotate: {
            title: "Rotate PDF",
            description:
                "Rotate all pages of your PDF.",
            accept: ".pdf",
            multiple: false
        },

        images: {
            title: "Images → PDF",
            description:
                "Convert JPG and PNG images into a PDF.",
            accept: "image/jpeg,image/png",
            multiple: true
        },

        delete: {
            title: "Delete Pages",
            description:
                "Remove selected pages from a PDF.",
            accept: ".pdf",
            multiple: false
        },

        extract: {
            title: "Extract Pages",
            description:
                "Create a new PDF using selected pages.",
            accept: ".pdf",
            multiple: false
        },

        numbers: {
            title: "Add Page Numbers",
            description:
                "Add page numbers to every page.",
            accept: ".pdf",
            multiple: false
        },

        watermark: {
            title: "Watermark PDF",
            description:
                "Add a text watermark to every page.",
            accept: ".pdf",
            multiple: false
        },

        compress: {
            title: "Compress PDF",
            description:
                "Optimize the PDF file.",
            accept: ".pdf",
            multiple: false
        }

    };


    // ==========================================
    // OPEN TOOL
    // ==========================================

    window.openTool = function(tool) {

        console.log("Opening tool:", tool);


        if (!toolInformation[tool]) {

            console.error(
                "Unknown tool:",
                tool
            );

            return;
        }


        window.currentTool = tool;


        const workspace =
            document.getElementById("workspace");

        const title =
            document.getElementById("toolTitle");

        const description =
            document.getElementById(
                "toolDescription"
            );

        const input =
            document.getElementById("fileInput");

        const fileList =
            document.getElementById("fileList");

        const options =
            document.getElementById("toolOptions");

        const status =
            document.getElementById("status");


        // Show workspace
        workspace.classList.remove("hidden");


        // Set title
        title.textContent =
            toolInformation[tool].title;


        // Set description
        description.textContent =
            toolInformation[tool].description;


        // Reset files
        window.selectedFiles = [];

        input.value = "";

        fileList.innerHTML = "";

        options.innerHTML = "";

        status.textContent = "";

        status.className = "";


        // Change accepted file types
        input.accept =
            toolInformation[tool].accept;


        input.multiple =
            toolInformation[tool].multiple;


        // Create options
        createOptions(tool);


        // Scroll to workspace
        workspace.scrollIntoView({
            behavior: "smooth"
        });

    };


    // ==========================================
    // CLOSE TOOL
    // ==========================================

    window.closeTool = function() {

        document
            .getElementById("workspace")
            .classList.add("hidden");


        document
            .getElementById("tools")
            .scrollIntoView({
                behavior: "smooth"
            });

    };


    // ==========================================
    // FILE INPUT
    // ==========================================

    const fileInput =
        document.getElementById("fileInput");


    fileInput.addEventListener(
        "change",
        function() {

            window.selectedFiles =
                Array.from(this.files);


            console.log(
                "Selected files:",
                window.selectedFiles
            );


            displayFiles();

        }
    );


    // ==========================================
    // DISPLAY FILES
    // ==========================================

    function displayFiles() {

        const list =
            document.getElementById(
                "fileList"
            );


        list.innerHTML = "";


        if (
            window.selectedFiles.length === 0
        ) {

            return;
        }


        window.selectedFiles.forEach(
            (file, index) => {

                const item =
                    document.createElement("div");


                item.className =
                    "file-item";


                item.innerHTML = `

                    <span>
                        ${index + 1}.
                        ${escapeHTML(file.name)}
                    </span>

                    <span>
                        ${formatSize(file.size)}
                    </span>

                `;


                list.appendChild(item);

            }
        );

    }


    // ==========================================
    // CREATE OPTIONS
    // ==========================================

    function createOptions(tool) {

        const container =
            document.getElementById(
                "toolOptions"
            );


        container.innerHTML = "";


        // PAGE OPTIONS

        if (
            tool === "split" ||
            tool === "delete" ||
            tool === "extract"
        ) {

            container.innerHTML = `

                <div class="option-group">

                    <label>
                        Page numbers
                    </label>

                    <input
                        type="text"
                        id="pageInput"
                        placeholder="Example: 1,3,5-8"
                    >

                    <small>
                        Example:
                        1,3,5-8
                    </small>

                </div>

            `;

        }


        // ROTATION

        if (tool === "rotate") {

            container.innerHTML = `

                <div class="option-group">

                    <label>
                        Rotation
                    </label>

                    <select id="rotationInput">

                        <option value="90">
                            90°
                        </option>

                        <option value="180">
                            180°
                        </option>

                        <option value="270">
                            270°
                        </option>

                    </select>

                </div>

            `;

        }


        // PAGE NUMBERS

        if (tool === "numbers") {

            container.innerHTML = `

                <div class="option-group">

                    <label>
                        Starting page number
                    </label>

                    <input
                        type="number"
                        id="numberInput"
                        value="1"
                        min="1"
                    >

                </div>

            `;

        }


        // WATERMARK

        if (tool === "watermark") {

            container.innerHTML = `

                <div class="option-group">

                    <label>
                        Watermark text
                    </label>

                    <input
                        type="text"
                        id="watermarkInput"
                        placeholder="Example: CONFIDENTIAL"
                    >

                </div>

            `;

        }

    }


    // ==========================================
    // MAIN PROCESS BUTTON
    // ==========================================

    window.processCurrentTool =
        async function() {

            if (
                window.selectedFiles.length === 0
            ) {

                showError(
                    "Please select a file first."
                );

                return;
            }


            try {

                showStatus(
                    "Processing... Please wait."
                );


                switch (
                    window.currentTool
                ) {

                    case "merge":
                        await mergePDF();
                        break;

                    case "split":
                        await splitPDF();
                        break;

                    case "rotate":
                        await rotatePDF();
                        break;

                    case "images":
                        await imagesToPDF();
                        break;

                    case "delete":
                        await deletePages();
                        break;

                    case "extract":
                        await extractPages();
                        break;

                    case "numbers":
                        await addPageNumbers();
                        break;

                    case "watermark":
                        await addWatermark();
                        break;

                    case "compress":
                        await compressPDF();
                        break;

                    default:

                        showError(
                            "Please select a PDF tool."
                        );

                }

            }

            catch(error) {

                console.error(
                    "PDF ERROR:",
                    error
                );


                showError(
                    "Error: " +
                    error.message
                );

            }

        };


    // ==========================================
    // MERGE PDF
    // ==========================================

    async function mergePDF() {

        if (
            window.selectedFiles.length < 2
        ) {

            showError(
                "Please select at least 2 PDF files."
            );

            return;
        }


        const output =
            await PDFDocument.create();


        for (
            const file
            of window.selectedFiles
        ) {

            const bytes =
                await file.arrayBuffer();


            const pdf =
                await PDFDocument.load(
                    bytes
                );


            const pages =
                await output.copyPages(
                    pdf,
                    pdf.getPageIndices()
                );


            pages.forEach(
                page => {

                    output.addPage(page);

                }
            );

        }


        const result =
            await output.save();


        downloadPDF(
            result,
            "merged.pdf"
        );


        showSuccess(
            "PDFs merged successfully!"
        );

    }


    // ==========================================
    // SPLIT PDF
    // ==========================================

    async function splitPDF() {

        await extractPages();

    }


    // ==========================================
    // EXTRACT PAGES
    // ==========================================

    async function extractPages() {

        const input =
            document.getElementById(
                "pageInput"
            );


        if (!input) {

            showError(
                "Enter page numbers."
            );

            return;
        }


        const pages =
            parsePageNumbers(
                input.value
            );


        if (pages.length === 0) {

            showError(
                "Enter valid page numbers."
            );

            return;
        }


        const bytes =
            await window.selectedFiles[0]
                .arrayBuffer();


        const source =
            await PDFDocument.load(
                bytes
            );


        const output =
            await PDFDocument.create();


        const total =
            source.getPageCount();


        for (
            const pageNumber
            of pages
        ) {

            const index =
                pageNumber - 1;


            if (
                index >= 0 &&
                index < total
            ) {

                const copied =
                    await output.copyPages(
                        source,
                        [index]
                    );


                output.addPage(
                    copied[0]
                );

            }

        }


        if (
            output.getPageCount() === 0
        ) {

            showError(
                "No valid pages were selected."
            );

            return;
        }


        const result =
            await output.save();


        downloadPDF(
            result,
            "extracted-pages.pdf"
        );


        showSuccess(
            "Pages extracted successfully!"
        );

    }


    // ==========================================
    // DELETE PAGES
    // ==========================================

    async function deletePages() {

        const input =
            document.getElementById(
                "pageInput"
            );


        const pages =
            parsePageNumbers(
                input.value
            );


        if (pages.length === 0) {

            showError(
                "Enter pages to delete."
            );

            return;
        }


        const bytes =
            await window.selectedFiles[0]
                .arrayBuffer();


        const pdf =
            await PDFDocument.load(
                bytes
            );


        const total =
            pdf.getPageCount();


        const indexes =
            pages
                .map(
                    page => page - 1
                )
                .filter(
                    index =>
                        index >= 0 &&
                        index < total
                )
                .sort(
                    (a, b) => b - a
                );


        if (
            indexes.length >= total
        ) {

            showError(
                "You cannot delete every page."
            );

            return;
        }


        indexes.forEach(
            index => {

                pdf.removePage(index);

            }
        );


        const result =
            await pdf.save();


        downloadPDF(
            result,
            "deleted-pages.pdf"
        );


        showSuccess(
            "Selected pages deleted!"
        );

    }


    // ==========================================
    // ROTATE
    // ==========================================

    async function rotatePDF() {

        const rotation =
            Number(
                document.getElementById(
                    "rotationInput"
                ).value
            );


        const bytes =
            await window.selectedFiles[0]
                .arrayBuffer();


        const pdf =
            await PDFDocument.load(
                bytes
            );


        pdf.getPages().forEach(
            page => {

                const current =
                    page.getRotation().angle;


                page.setRotation(
                    degrees(
                        current + rotation
                    )
                );

            }
        );


        const result =
            await pdf.save();


        downloadPDF(
            result,
            "rotated.pdf"
        );


        showSuccess(
            "PDF rotated successfully!"
        );

    }


    // ==========================================
    // IMAGES TO PDF
    // ==========================================

    async function imagesToPDF() {

        const output =
            await PDFDocument.create();


        for (
            const file
            of window.selectedFiles
        ) {

            const bytes =
                await file.arrayBuffer();


            let image;


            if (
                file.type ===
                "image/jpeg"
            ) {

                image =
                    await output.embedJpg(
                        bytes
                    );

            }

            else if (
                file.type ===
                "image/png"
            ) {

                image =
                    await output.embedPng(
                        bytes
                    );

            }

            else {

                continue;

            }


            const width =
                image.width;


            const height =
                image.height;


            const page =
                output.addPage([
                    width,
                    height
                ]);


            page.drawImage(
                image,
                {
                    x: 0,
                    y: 0,
                    width,
                    height
                }
            );

        }


        if (
            output.getPageCount() === 0
        ) {

            showError(
                "Please select JPG or PNG images."
            );

            return;
        }


        const result =
            await output.save();


        downloadPDF(
            result,
            "images-to-pdf.pdf"
        );


        showSuccess(
            "Images converted successfully!"
        );

    }


    // ==========================================
    // PAGE NUMBERS
    // ==========================================

    async function addPageNumbers() {

        const start =
            Number(
                document.getElementById(
                    "numberInput"
                ).value
            ) || 1;


        const bytes =
            await window.selectedFiles[0]
                .arrayBuffer();


        const pdf =
            await PDFDocument.load(
                bytes
            );


        const font =
            await pdf.embedFont(
                StandardFonts.Helvetica
            );


        pdf.getPages().forEach(
            (page, index) => {

                const size =
                    page.getSize();


                const number =
                    String(
                        start + index
                    );


                page.drawText(
                    number,
                    {

                        x:
                            size.width / 2 - 5,

                        y: 20,

                        size: 10,

                        font,

                        color:
                            rgb(
                                0.2,
                                0.2,
                                0.2
                            )

                    }
                );

            }
        );


        const result =
            await pdf.save();


        downloadPDF(
            result,
            "numbered.pdf"
        );


        showSuccess(
            "Page numbers added successfully!"
        );

    }


    // ==========================================
    // WATERMARK
    // ==========================================

    async function addWatermark() {

        const text =
            document.getElementById(
                "watermarkInput"
            ).value.trim();


        if (!text) {

            showError(
                "Please enter watermark text."
            );

            return;
        }


        const bytes =
            await window.selectedFiles[0]
                .arrayBuffer();


        const pdf =
            await PDFDocument.load(
                bytes
            );


        const font =
            await pdf.embedFont(
                StandardFonts.HelveticaBold
            );


        pdf.getPages().forEach(
            page => {

                const size =
                    page.getSize();


                page.drawText(
                    text,
                    {

                        x:
                            size.width / 2 - 100,

                        y:
                            size.height / 2,

                        size: 35,

                        font,

                        rotate:
                            degrees(45),

                        opacity: 0.2,

                        color:
                            rgb(
                                0.4,
                                0.4,
                                0.4
                            )

                    }
                );

            }
        );


        const result =
            await pdf.save();


        downloadPDF(
            result,
            "watermarked.pdf"
        );


        showSuccess(
            "Watermark added successfully!"
        );

    }


    // ==========================================
    // COMPRESS
    // ==========================================

    async function compressPDF() {

        const bytes =
            await window.selectedFiles[0]
                .arrayBuffer();


        const pdf =
            await PDFDocument.load(
                bytes
            );


        const result =
            await pdf.save({
                useObjectStreams: true
            });


        downloadPDF(
            result,
            "optimized.pdf"
        );


        showSuccess(
            "PDF optimization completed."
        );

    }


    // ==========================================
    // PAGE NUMBER PARSER
    // ==========================================

    function parsePageNumbers(text) {

        const result = [];


        if (!text) {

            return result;

        }


        const parts =
            text.split(",");


        for (
            const part
            of parts
        ) {

            const value =
                part.trim();


            if (
                value.includes("-")
            ) {

                const range =
                    value.split("-");


                const start =
                    Number(range[0]);


                const end =
                    Number(range[1]);


                if (
                    Number.isInteger(start) &&
                    Number.isInteger(end) &&
                    start <= end
                ) {

                    for (
                        let i = start;
                        i <= end;
                        i++
                    ) {

                        result.push(i);

                    }

                }

            }

            else {

                const number =
                    Number(value);


                if (
                    Number.isInteger(number)
                ) {

                    result.push(number);

                }

            }

        }


        return [
            ...new Set(result)
        ];

    }


    // ==========================================
    // DOWNLOAD
    // ==========================================

    function downloadPDF(
        bytes,
        filename
    ) {

        const blob =
            new Blob(
                [bytes],
                {
                    type:
                        "application/pdf"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            filename;


        document.body.appendChild(link);


        link.click();


        link.remove();


        setTimeout(
            () => {
                URL.revokeObjectURL(url);
            },
            1000
        );

    }


    // ==========================================
    // STATUS
    // ==========================================

    function showStatus(message) {

        const status =
            document.getElementById(
                "status"
            );


        status.className = "";

        status.textContent =
            message;

    }


    function showSuccess(message) {

        const status =
            document.getElementById(
                "status"
            );


        status.className =
            "success";


        status.textContent =
            "✓ " + message;

    }


    function showError(message) {

        const status =
            document.getElementById(
                "status"
            );


        status.className =
            "error";


        status.textContent =
            "✕ " + message;

    }


    // ==========================================
    // HELPERS
    // ==========================================

    function formatSize(bytes) {

        if (bytes < 1024) {

            return bytes + " B";

        }


        if (bytes < 1024 * 1024) {

            return (
                bytes / 1024
            ).toFixed(2) + " KB";

        }


        return (
            bytes /
            (1024 * 1024)
        ).toFixed(2) + " MB";

    }


    function escapeHTML(text) {

        const div =
            document.createElement("div");


        div.textContent = text;


        return div.innerHTML;

    }


});