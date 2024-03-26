import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { AllJobsDataType, useAllJobsContext } from "../pages/AllJobs";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
    const {
        data: { numOfPages, currentPage },
    } = useAllJobsContext() as AllJobsDataType;
    const navigate = useNavigate();

    const { search, pathname } = useLocation();
    const handlePageChange = (pageNumber: number) => {
        console.log(pageNumber);
        const searchParams = new URLSearchParams(search);
        searchParams.set("page", String(pageNumber));
        console.log(searchParams.toString());
        navigate(`${pathname}?${searchParams.toString()}`);
    };

    const addPageButtons = ({
        pageNumber,
        activeClass,
    }: {
        pageNumber: number;
        activeClass: boolean;
    }) => {
        return (
            <button
                className={`btn page-btn ${activeClass && "active"}`}
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
            >
                {pageNumber}
            </button>
        );
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        pageButtons.push(
            addPageButtons({ pageNumber: 1, activeClass: currentPage === 1 })
        );

        if(currentPage > 3) {
          pageButtons.push(<span className="page-btn dots" key='dots-1'>...</span>)
        }

        if(currentPage !== 1 && currentPage !== 2) {
          pageButtons.push(
            addPageButtons({
                pageNumber: currentPage-1,
                activeClass: false,
            })
        );
        }
 
        if(currentPage !==1 && currentPage !== numOfPages) {
          pageButtons.push(
            addPageButtons({
                pageNumber: currentPage,
                activeClass: true,
            })
        );
        }

        if(currentPage !== numOfPages && currentPage !== numOfPages - 1) {
          pageButtons.push(
            addPageButtons({
                pageNumber: currentPage+1,
                activeClass: false,
            })
        );
        }

        if(currentPage < numOfPages - 2) {
          pageButtons.push(<span className="page-btn dots" key='dots-2'>...</span>)
        }


        pageButtons.push(
            addPageButtons({
                pageNumber: numOfPages,
                activeClass: currentPage === numOfPages,
            })
        );
        return pageButtons;
    };
    return (
        <Wrapper>
            <button
                className="btn prev-btn"
                onClick={() => {
                    let prevPage = currentPage - 1;
                    if (prevPage < 1) prevPage = 1;
                    handlePageChange(prevPage);
                }}
            >
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className="btn-container">{renderPageButtons()}</div>
            <button
                className="btn next-btn"
                onClick={() => {
                    let nextPage = currentPage + 1;
                    if (nextPage > numOfPages) nextPage = numOfPages;
                    handlePageChange(nextPage);
                }}
            >
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    );
};
export default PageBtnContainer;
