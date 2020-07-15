import styled from 'styled-components/macro';

export const IssueDetailsForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const IssueDetailsField = styled.div`
    margin-bottom: 12px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const IssueDetailsAbout = styled.div`
    margin: 8px 0 20px;
`;

export const IssueDetailsFooter = styled.div`
    margin-top: 20px;
    width: 120px;
`;
