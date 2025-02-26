import React from "react";

const BarcodeResultBox = ({
  setFlags,
  isExpanded,
  totalScannedBarcodes,
  result,
  barcodesScannedCount,
  flags,
  toggleExpand,
  copyResult,
  exportToCSV,
  searchResult,
}) => {
  return (
    <div>
      {flags.showResultBox && (
        <div className="barcodesList">
          <div className={`resultContainer ${isExpanded ? "expanded" : ""}`}>
            <div
              className="line_container"
              onClick={toggleExpand}
            >
              <div
                className="results_line"
                style={{ background: isExpanded ? "#FF3347" : "#00000033" }}
              ></div>
            </div>

            {/* Full Content View */}
            <div className="popup_expansion">
              {totalScannedBarcodes.length ? (
                <div className="result_text_list">
                  <p className="total_scanned_barcodes">
                    <span>{totalScannedBarcodes.length} items scanned</span>
                    <button
                      onClick={() =>
                        setFlags((prevFlags) => ({
                          ...prevFlags,
                          showResultBox: false,
                        }))
                      }
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.8333 1.34175L10.6583 0.166748L5.99999 4.82508L1.34166 0.166748L0.166656 1.34175L4.82499 6.00008L0.166656 10.6584L1.34166 11.8334L5.99999 7.17508L10.6583 11.8334L11.8333 10.6584L7.17499 6.00008L11.8333 1.34175Z" />
                      </svg>
                    </button>
                  </p>
                  <div className="latest_scan">
                    <p className="desc">
                      {
                        totalScannedBarcodes[totalScannedBarcodes.length - 1]
                          .textualData
                      }
                    </p>
                    <p className="title">
                      {
                        totalScannedBarcodes[totalScannedBarcodes.length - 1]
                          .barcodeTypeName
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="result_text_img">
                  <p className="result_title">
                    <span>{result.barcodeTypeName}</span>
                    <button
                      onClick={() =>
                        setFlags((prevFlags) => ({
                          ...prevFlags,
                          showResultBox: false,
                        }))
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        fill="#FF3347"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                  </p>
                  <div className="img_container">
                    <canvas
                      style={{ width: "inherit" }}
                      id="barkoder-result-image"
                    ></canvas>
                  </div>
                  <p>{barcodesScannedCount} items scanned</p>
                  {result.textualData && <p>{result.textualData}</p>}
                  {totalScannedBarcodes.length > 0 && (
                    <p className="total_scanned_barcodes">
                      {totalScannedBarcodes.length} items scanned
                    </p>
                  )}
                </div>
              )}

              {isExpanded && (
                <div className="results_btn_container">
                  <div
                    className="main_btn"
                    onClick={copyResult}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.6 22.0014H4.9C4.39609 22.0014 3.91282 21.8013 3.5565 21.4449C3.20018 21.0886 3 20.6053 3 20.1014V8.90143C3 8.39752 3.20018 7.91425 3.5565 7.55793C3.91282 7.20161 4.39609 7.00143 4.9 7.00143H7.5V5.60143C7.48877 4.86303 7.7635 4.14888 8.26672 3.60838C8.76994 3.06788 9.46267 2.74291 10.2 2.70143C10.4375 2.71099 10.6747 2.6771 10.9 2.60143C11.1515 2.10576 11.5391 1.69201 12.0172 1.40865C12.4954 1.12528 13.0444 0.98403 13.6 1.00143H15C15.5531 0.996655 16.0971 1.14319 16.573 1.4252C17.0488 1.7072 17.4386 2.11394 17.7 2.60143C17.9375 2.59188 18.1747 2.62576 18.4 2.70143C19.1205 2.76448 19.7901 3.09922 20.2729 3.63776C20.7558 4.17629 21.0157 4.87832 21 5.60143V16.0014C21.0073 16.3974 20.9347 16.7908 20.7866 17.1581C20.6384 17.5254 20.4177 17.859 20.1376 18.1391C19.8576 18.4191 19.524 18.6398 19.1567 18.788C18.7894 18.9362 18.396 19.0088 18 19.0014H16.5V20.1014C16.5085 20.3532 16.4652 20.6041 16.3727 20.8385C16.2802 21.0728 16.1406 21.2857 15.9624 21.4639C15.7843 21.642 15.5714 21.7817 15.337 21.8741C15.1027 21.9666 14.8518 22.0099 14.6 22.0014ZM4.9 8.50143C4.79622 8.50845 4.69851 8.55285 4.62496 8.6264C4.55142 8.69995 4.50702 8.79766 4.5 8.90143V20.1014C4.50702 20.2052 4.55142 20.3029 4.62496 20.3765C4.69851 20.45 4.79622 20.4944 4.9 20.5014H14.7C14.8038 20.4944 14.9015 20.45 14.975 20.3765C15.0486 20.3029 15.093 20.2052 15.1 20.1014V8.90143C15.0571 8.79802 14.9888 8.70712 14.9014 8.63718C14.814 8.56725 14.7103 8.52055 14.6 8.50143H4.9ZM16.5 17.5014H18C18.3948 17.4918 18.7707 17.3307 19.05 17.0514C19.3292 16.7722 19.4904 16.3962 19.5 16.0014V5.60143C19.5071 5.42402 19.479 5.24696 19.4174 5.08043C19.3559 4.9139 19.262 4.76119 19.1411 4.63108C19.0203 4.50097 18.875 4.39603 18.7135 4.3223C18.552 4.24856 18.3774 4.20749 18.2 4.20143H18C17.9485 4.56244 17.7683 4.89272 17.4928 5.13155C17.2172 5.37038 16.8647 5.50172 16.5 5.50143H12C11.6203 5.49762 11.2557 5.35182 10.9781 5.09272C10.7005 4.83361 10.53 4.47999 10.5 4.10143H10.3C9.93899 4.15298 9.60872 4.33309 9.36989 4.60867C9.13105 4.88425 8.99971 5.23677 9 5.60143V7.00143H14.6C14.8495 7.00143 15.0966 7.05058 15.3271 7.14606C15.5576 7.24155 15.7671 7.3815 15.9435 7.55793C16.1199 7.73436 16.2599 7.94382 16.3554 8.17434C16.4509 8.40485 16.5 8.65192 16.5 8.90143V17.5014ZM12.1 3.60143C12.0205 3.71877 11.985 3.86048 12 4.00143H16.5C16.515 3.86048 16.4795 3.71877 16.4 3.60143C16.2974 3.31126 16.1081 3.05966 15.8576 2.88077C15.6072 2.70188 15.3078 2.60436 15 2.60143H13.5C13.182 2.55042 12.8567 2.62678 12.5947 2.81397C12.3326 3.00116 12.1549 3.28409 12.1 3.60143ZM6.8 18.3014C6.58783 18.3014 6.38434 18.2171 6.23431 18.0671C6.08429 17.9171 6 17.7136 6 17.5014C6 17.2893 6.08429 17.0858 6.23431 16.9357C6.38434 16.7857 6.58783 16.7014 6.8 16.7014C7.01217 16.7014 7.21566 16.7857 7.36569 16.9357C7.51571 17.0858 7.6 17.2893 7.6 17.5014C7.6 17.7136 7.51571 17.9171 7.36569 18.0671C7.21566 18.2171 7.01217 18.3014 6.8 18.3014ZM12.8 18.3014H9C8.89453 18.3029 8.78984 18.2832 8.69211 18.2436C8.59438 18.2039 8.5056 18.145 8.43102 18.0704C8.35643 17.9958 8.29756 17.9071 8.25788 17.8093C8.2182 17.7116 8.19852 17.6069 8.2 17.5014C8.19016 17.3939 8.2041 17.2855 8.24083 17.184C8.27755 17.0825 8.33616 16.9903 8.41251 16.9139C8.48885 16.8376 8.58106 16.779 8.68259 16.7423C8.78412 16.7055 8.89248 16.6916 9 16.7014H12.8C13.0122 16.7014 13.2157 16.7857 13.3657 16.9357C13.5157 17.0858 13.6 17.2893 13.6 17.5014C13.6 17.7136 13.5157 17.9171 13.3657 18.0671C13.2157 18.2171 13.0122 18.3014 12.8 18.3014ZM6.8 15.3014C6.58783 15.3014 6.38434 15.2171 6.23431 15.0671C6.08429 14.9171 6 14.7136 6 14.5014C6 14.2893 6.08429 14.0858 6.23431 13.9357C6.38434 13.7857 6.58783 13.7014 6.8 13.7014C7.01217 13.7014 7.21566 13.7857 7.36569 13.9357C7.51571 14.0858 7.6 14.2893 7.6 14.5014C7.6 14.7136 7.51571 14.9171 7.36569 15.0671C7.21566 15.2171 7.01217 15.3014 6.8 15.3014ZM12.8 15.3014H9C8.89453 15.3029 8.78984 15.2832 8.69211 15.2436C8.59438 15.2039 8.5056 15.145 8.43102 15.0704C8.35643 14.9958 8.29756 14.9071 8.25788 14.8093C8.2182 14.7116 8.19852 14.6069 8.2 14.5014C8.19016 14.3939 8.2041 14.2856 8.24083 14.184C8.27755 14.0825 8.33616 13.9903 8.41251 13.9139C8.48885 13.8376 8.58106 13.779 8.68259 13.7423C8.78412 13.7055 8.89248 13.6916 9 13.7014H12.8C13.0122 13.7014 13.2157 13.7857 13.3657 13.9357C13.5157 14.0858 13.6 14.2893 13.6 14.5014C13.6 14.7136 13.5157 14.9171 13.3657 15.0671C13.2157 15.2171 13.0122 15.3014 12.8 15.3014ZM6.8 12.3014C6.58783 12.3014 6.38434 12.2171 6.23431 12.0671C6.08429 11.9171 6 11.7136 6 11.5014C6 11.2893 6.08429 11.0858 6.23431 10.9357C6.38434 10.7857 6.58783 10.7014 6.8 10.7014C6.90506 10.7014 7.00909 10.7221 7.10615 10.7623C7.20321 10.8025 7.2914 10.8615 7.36569 10.9357C7.43997 11.01 7.4989 11.0982 7.5391 11.1953C7.57931 11.2923 7.6 11.3964 7.6 11.5014C7.6 11.6065 7.57931 11.7105 7.5391 11.8076C7.4989 11.9046 7.43997 11.9928 7.36569 12.0671C7.2914 12.1414 7.20321 12.2003 7.10615 12.2405C7.00909 12.2807 6.90506 12.3014 6.8 12.3014ZM12.8 12.3014H9C8.89453 12.3029 8.78984 12.2832 8.69211 12.2436C8.59438 12.2039 8.5056 12.145 8.43102 12.0704C8.35643 11.9958 8.29756 11.9071 8.25788 11.8093C8.2182 11.7116 8.19852 11.6069 8.2 11.5014C8.19016 11.3939 8.2041 11.2856 8.24083 11.184C8.27755 11.0825 8.33616 10.9903 8.41251 10.9139C8.48885 10.8376 8.58106 10.779 8.68259 10.7423C8.78412 10.7055 8.89248 10.6916 9 10.7014H12.8C12.9051 10.7014 13.0091 10.7221 13.1061 10.7623C13.2032 10.8025 13.2914 10.8615 13.3657 10.9357C13.44 11.01 13.4989 11.0982 13.5391 11.1953C13.5793 11.2923 13.6 11.3964 13.6 11.5014C13.6 11.6065 13.5793 11.7105 13.5391 11.8076C13.4989 11.9046 13.44 11.9928 13.3657 12.0671C13.2914 12.1414 13.2032 12.2003 13.1061 12.2405C13.0091 12.2807 12.9051 12.3014 12.8 12.3014Z"
                        fill="#FF3347"
                      />
                    </svg>
                    <span>Copy</span>
                  </div>
                  <div
                    className="main_btn"
                    onClick={exportToCSV}
                  >
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 4.5H15.5C15.7761 4.5 16 4.72386 16 5V6H17.5V5C17.5 3.89543 16.6046 3 15.5 3H5.5C4.39543 3 3.5 3.89543 3.5 5V15C3.5 16.1046 4.39543 17 5.5 17H6.5V15.5H5.5C5.22386 15.5 5 15.2761 5 15V5C5 4.72386 5.22386 4.5 5.5 4.5Z"
                        fill="#FF3347"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.5 8.5H9.5C9.22386 8.5 9 8.72386 9 9V19C9 19.2761 9.22386 19.5 9.5 19.5H19.5C19.7761 19.5 20 19.2761 20 19V9C20 8.72386 19.7761 8.5 19.5 8.5ZM9.5 7C8.39543 7 7.5 7.89543 7.5 9V19C7.5 20.1046 8.39543 21 9.5 21H19.5C20.6046 21 21.5 20.1046 21.5 19V9C21.5 7.89543 20.6046 7 19.5 7H9.5Z"
                        fill="#FF3347"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.5 12H8.5V10.5H20.5V12Z"
                        fill="#FF3347"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.5 15H8.5V13.5H20.5V15Z"
                        fill="#FF3347"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5 20V11H15V20H13.5Z"
                        fill="#FF3347"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.5 18H8.5V16.5H20.5V18Z"
                        fill="#FF3347"
                      />
                    </svg>
                    <p>CSV</p>
                  </div>

                  <div
                    className="main_btn"
                    onClick={searchResult}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z"
                        fill="#FF3347"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.9429 15.9429C16.3334 15.5524 16.9666 15.5524 17.3571 15.9429L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L15.9429 17.3571C15.5524 16.9666 15.5524 16.3334 15.9429 15.9429Z"
                        fill="#FF3347"
                      />
                    </svg>
                    <span>Search</span>
                  </div>
                  <div
                    className="main_btn"
                    onClick={toggleExpand}
                  >
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.5 3.68605C3.5 2.20258 4.70258 1 6.18605 1H12.0465C13.53 1 14.7326 2.20258 14.7326 3.68605V19.314C14.7326 20.7974 13.53 22 12.0465 22H6.18605C4.70258 22 3.5 20.7974 3.5 19.314V3.68605ZM6.18605 2.46512C5.51175 2.46512 4.96512 3.01175 4.96512 3.68605V19.314C4.96512 19.9883 5.51175 20.5349 6.18605 20.5349H12.0465C12.7208 20.5349 13.2674 19.9883 13.2674 19.314V3.68605C13.2674 3.01175 12.7208 2.46512 12.0465 2.46512H6.18605ZM7.16279 3.93023C7.16279 3.52565 7.49077 3.19767 7.89535 3.19767H10.3372C10.7418 3.19767 11.0698 3.52565 11.0698 3.93023C11.0698 4.33481 10.7418 4.66279 10.3372 4.66279H7.89535C7.49077 4.66279 7.16279 4.33481 7.16279 3.93023ZM15.9535 7.83721C15.9535 7.43263 16.2815 7.10465 16.686 7.10465H19.1279C19.5325 7.10465 19.8605 7.43263 19.8605 7.83721C19.8605 8.24179 19.5325 8.56977 19.1279 8.56977H16.686C16.2815 8.56977 15.9535 8.24179 15.9535 7.83721ZM15.9535 10.7674C15.9535 10.3629 16.2815 10.0349 16.686 10.0349H21.0814C21.486 10.0349 21.814 10.3629 21.814 10.7674C21.814 11.172 21.486 11.5 21.0814 11.5H16.686C16.2815 11.5 15.9535 11.172 15.9535 10.7674ZM15.9535 13.6977C15.9535 13.2931 16.2815 12.9651 16.686 12.9651H19.1279C19.5325 12.9651 19.8605 13.2931 19.8605 13.6977C19.8605 14.1023 19.5325 14.4302 19.1279 14.4302H16.686C16.2815 14.4302 15.9535 14.1023 15.9535 13.6977ZM8.13953 19.5581C8.13953 19.1536 8.46751 18.8256 8.87209 18.8256H9.36047C9.76505 18.8256 10.093 19.1536 10.093 19.5581C10.093 19.9627 9.76505 20.2907 9.36047 20.2907H8.87209C8.46751 20.2907 8.13953 19.9627 8.13953 19.5581Z"
                        fill="#FF3347"
                      />
                    </svg>
                    <span>Details</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeResultBox;
