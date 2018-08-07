class BufferReader{
    constructor(_buf){
        this.m_buffers = _buf;
        this.m_length = _buf.length;
        this.m_pos = 0;
    }

    read(len) {
        let buf = new Buffer(len);
        let readpos = this.m_pos;
        this.m_pos += len;
        this.m_buffers.copy(buf, 0, readpos, readpos+len);
        return buf;
    }

    readUInt8() {
        let readpos = this.m_pos;
        this.m_pos++;
        return this.m_buffers.readUInt8(readpos);
    }

    readUInt16() {
        let readpos = this.m_pos;
        this.m_pos += 2;
        return this.m_buffers.readUInt16LE(readpos);
    }

    readUInt32() {
        let readpos = this.m_pos;
        this.m_pos += 4;
        return this.m_buffers.readUInt32LE(readpos);
    }

    readUInt64() {
        //var buf = new Buffer(8);
        let readpos = this.m_pos;
        this.m_pos += 8;
        //this.buffers.copy(buf, 0, readpos, 8);
        //let bufInt = (buf.readUInt32LE(readpos) << 32) + buf.readUInt32LE(readpos+4);
        let bufInt = this.m_buffers.readUInt32LE(readpos);
        return bufInt;
    }

    readBin(datalen) {
        let buf = new Buffer(datalen);
        let readpos = this.m_pos;
        this.m_pos += datalen;
        this.m_buffers.copy(buf, 0, readpos, readpos+datalen);
        return buf;
    }

    getPos() {
        return this.m_pos;
    }

    resetPos() {
        this.m_pos = 0;
    }

    setPos(postion) {
        if( postion<0 || postion>=this.m_length){
            return;
        }
        this.m_pos = postion;
    }
}


module.exports = BufferReader;