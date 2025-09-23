import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";

const DownloadSalarySlip = ({ salaryData, workerData }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const iframeRef = useRef(null);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Bajrang Latkan - Salary Slip", 14, 20);

    // Month & Summary
    doc.setFontSize(12);
    doc.text(`Month: ${salaryData.month}`, 14, 30);
    doc.text(`Worker: ${workerData.fullName} - ${workerData.workerId}`, 14, 36);
    doc.text(`Total Packets: ${salaryData.totalPackets}`, 14, 42);
    doc.text(`Total Earnings: ${salaryData.totalEarnings}`, 14, 48);

    // Table
    const tableData = salaryData.productSummary.map((item, index) => [
      index + 1,
      item.productName,
      item.totalEarnings / item.packets,
      item.packets,
      `${item.totalEarnings}`,
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["#", "Product", "Rate", "Packets", "Earnings"]],
      body: tableData,
    });

    // Footer
    doc.text("Status: Paid", 14, doc.lastAutoTable.finalY + 10);
    doc.text(
      "Thank you for your hard work!",
      14,
      doc.lastAutoTable.finalY + 20
    );

    // Generate blob URL for preview
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Bajrang Latkan - Salary Slip", 14, 20);
    doc.setFontSize(12);
    doc.text(`Month: ${salaryData.month}`, 14, 30);
    doc.text(`Total Packets: ${salaryData.totalPackets}`, 14, 38);
    doc.text(`Total Earnings: ${salaryData.totalEarnings}`, 14, 46);

    const tableData = salaryData.productSummary.map((item, index) => [
      index + 1,
      item.productName,
      item.totalEarnings / item.packets,
      item.packets,
      `${item.totalEarnings}`,
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["#", "Product", "Rate", "Packets", "Earnings"]],
      body: tableData,
    });

    doc.text("Status: Paid", 14, doc.lastAutoTable.finalY + 10);
    doc.text(
      "Thank you for your hard work!",
      14,
      doc.lastAutoTable.finalY + 20
    );

    doc.save(`SalarySlip-${salaryData.month}.pdf`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-purple-600 border-purple-600 hover:bg-purple-50"
          onClick={generatePDF}
        >
          View Salary Slip
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Salary Slip Preview</DialogTitle>
        </DialogHeader>
        {pdfUrl ? (
          <iframe
            ref={iframeRef}
            src={pdfUrl}
            title="Salary Slip Preview"
            width="100%"
            height="600px"
            className="border rounded-md"
          />
        ) : (
          <p className="text-gray-500">Generating preview...</p>
        )}
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleDownload}
            className="text-white bg-purple-600 hover:bg-purple-700"
          >
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadSalarySlip;
