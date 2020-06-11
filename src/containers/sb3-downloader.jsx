import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';
import {setHtmlFile} from '../reducers/htmllifiers.js';

/**
 * Project saver component passes a downloadProject function to its child.
 * It expects this child to be a function with the signature
 *     function (downloadProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <SB3Downloader>{(downloadProject, props) => (
 *     <MyCoolComponent
 *         onClick={downloadProject}
 *         {...props}
 *     />
 * )}</SB3Downloader>
 */
class SB3Downloader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'downloadProject'
        ]);
    }
    downloadProject () {
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            const time = new Date()
            content.lastModified = time*1;
            content.lastModifiedDate = time;
            content.webkitRelativePath = '';
            content.name = this.props.projectFilename;
            this.props.setFileState(content)
            // downloadBlob(this.props.projectFilename, content);
        });
    }
    render () {
        const {
            children
        } = this.props;
        return children(
            this.props.className,
            this.downloadProject
        );
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

SB3Downloader.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func,
    setFileState: PropTypes.func,
    fileState: PropTypes.object,
    
};
SB3Downloader.defaultProps = {
    className: ''
};

const mapStateToProps = state =>{
    return ({
        fileState: state.scratchGui.fileState.htmlfile,
        saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
        projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
    })
} ;
const mapDispatchToProps = dispatch => ({
    setFileState: (file) => dispatch(setHtmlFile(file)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SB3Downloader);
