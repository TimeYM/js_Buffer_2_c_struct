class BufferWriter{
    constructor(){
        this.m_buffers = [];
        this.m_length = 0;
    }

    append(buf) {
        this.m_buffers.push(buf);
        this.m_length += buf.length;
    }

    appendUInt8(b) {
        let buf = new Buffer(1);
        buf.writeUInt8(b);
        this.append(buf);
    }

    appendUInt16(word) {
        var buf = new Buffer(2);
        buf.writeUInt16LE(word);
        this.append(buf);
    }

    appendUInt32(dword) {
        let buf = new Buffer(4);
        buf.writeUInt32LE(dword);
        this.append(buf);
    }

    //有问题 这里只保留了64位的低32位，高32位没处理
    appendUInt64(qword) {
        let buf = new Buffer(8);
        buf.fill(0);
        buf.writeUInt32LE(qword & 0xffffffff, 0);
        //buf.writeUInt32LE(qword << 32, 4);
        this.append(buf);
    }

    appendStringWithLength(str, maxlen) {
        let buf = new Buffer(maxlen);
        buf.fill();
        buf.write(str, 0);
        this.append(buf);
    }

    appendBufferWithLength(srcbuf, maxlen) {
        let buf = new Buffer(maxlen);
        buf.fill();
        srcbuf.copy(buf);
        this.append(buf);
    }

    getData() {
        let allbuffer = Buffer.concat(this.m_buffers);
        //let buffer = allbuffer.slice(0, this.m_length);
        return allbuffer.slice(0, this.m_length);
    }
    
    getSize() {
        return this.m_length;
    }
}

module.exports = BufferWriter;