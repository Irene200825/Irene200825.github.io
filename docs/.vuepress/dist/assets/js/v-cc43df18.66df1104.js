"use strict";(self.webpackChunkvuepress_custom=self.webpackChunkvuepress_custom||[]).push([[353],{4932:(t,e,l)=>{l.r(e),l.d(e,{data:()=>a});const a={key:"v-cc43df18",path:"/web/python/%E7%BB%99%E8%80%81%E5%A6%B9%E6%95%B4%E7%90%86%E7%9A%84python%E7%AC%94%E8%AE%B0%E4%B8%80.html",title:"给老妹整理的python笔记一",lang:"en-US",frontmatter:{title:"给老妹整理的python笔记一",date:"2021-10-13T17:45:11.000Z",tags:"python",toc:!0,categories:"python",excerpt:"给老妹整理的笔记"},excerpt:"",headers:[{level:2,title:"创建变量赋值",slug:"创建变量赋值",children:[]},{level:2,title:"数据类型",slug:"数据类型",children:[]},{level:2,title:"注释",slug:"注释",children:[]},{level:2,title:"运算符",slug:"运算符",children:[{level:3,title:"比较运算符",slug:"比较运算符",children:[]},{level:3,title:"赋值运算符",slug:"赋值运算符",children:[]}]},{level:2,title:"逻辑运算符",slug:"逻辑运算符",children:[]},{level:2,title:"运算符优先级",slug:"运算符优先级",children:[]},{level:2,title:"操作运算符",slug:"操作运算符",children:[]},{level:2,title:"条件语句",slug:"条件语句",children:[]}],filePathRelative:"web/python/给老妹整理的python笔记一.md",git:{updatedTime:1638780646e3,contributors:[{name:"zhanghongan",email:"zhanghongan2021@163.com",commits:1}]}}},6433:(t,e,l)=>{l.r(e),l.d(e,{default:()=>s});const a=(0,l(6252).uE)('<h2 id="创建变量赋值" tabindex="-1"><a class="header-anchor" href="#创建变量赋值" aria-hidden="true">#</a> 创建变量赋值</h2><p>变量名 = 存储在变量中的值</p><p>x = 10</p><hr><p>多个变量赋值赋同一个值</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code>a<span class="token operator">=</span>b<span class="token operator">=</span>c<span class="token operator">=</span><span class="token number">10</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>多个变量赋不同的值</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;runoob&quot;</span>\n···\n等价于\n<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\na<span class="token operator">=</span><span class="token number">1</span>\nb<span class="token operator">=</span><span class="token number">2</span>\nc<span class="token operator">=</span><span class="token string">&quot;runoob&quot;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2><p>什么是数据类型？存储在变量中的值的类型</p><ul><li><p>Number（数字） ：包括int、float、bool、complex（复数）</p><table><thead><tr><th>Number类型细分</th><th>举例</th></tr></thead><tbody><tr><td>int整型</td><td>10 20</td></tr><tr><td>float浮点型</td><td>5.5 0.2</td></tr><tr><td>bool布尔值</td><td>true false</td></tr><tr><td>complex复数</td><td></td></tr></tbody></table></li><li><p>String（字符串）</p><p>用单引号 <strong>&#39;</strong> 或双引号 <strong>&quot;</strong> 括起来的字符，比如“hello world”，‘02’，‘您好’</p></li><li><p>List（列表）</p><p>列表是写在方括号 <strong>[]</strong> 之间、用逗号分隔开的元素列表。[元素，元素，元素]。元素可以是数据，也可以是字符串，甚至可以是列表。</p><p>比如: [1,2,&quot;你好&quot;] [1,2,&quot;你好&quot;，[&#39;hhh&#39;]]</p></li><li><p>Tuple（元组）</p><p>元组写在小括号 <strong>()</strong> 里，元素之间用逗号隔开。(元素，元素)。元素可以是数据，也可以是字符串。</p><p>比如: ( &#39;abcd&#39;, 786 , 2.23, &#39;runoob&#39;, 70.2 )</p></li><li><p>Set（集合）</p><p>可以使用大括号 <strong>{ }</strong> 或者 <strong>set()</strong> 函数创建集合,输出会去除重复元素</p><p>比如: sites = {&#39;Google&#39;, &#39;Taobao&#39;, &#39;Runoob&#39;, &#39;Facebook&#39;, &#39;Zhihu&#39;, &#39;Baidu&#39;}</p><p>使用print(sites)输出，为{&#39;Zhihu&#39;, &#39;Runoob&#39;, &#39;Google&#39;, &#39;Facebook&#39;, &#39;Baidu&#39;, &#39;Taobao&#39;}</p><p>比如： a = set(&#39;abracadabra&#39;)</p><p>使用print(a)输出，为{&#39;b&#39;, &#39;a&#39;, &#39;d&#39;, &#39;c&#39;, &#39;r&#39;}</p></li><li><p>Dictionary（字典）</p></li></ul><p>​ 字典当中的元素是通过键来存取的。</p><p>​ 比如：dict = {} dict[&#39;one&#39;] = &quot;您好&quot; one是键，您好是键对应的值</p><p>​ 比如：tinydict = {&#39;one&#39;: &#39;您好&#39;,&#39;code&#39;:1}</p><h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h2><p>在代码中遇到下面这部分是注释，就是你的笔记，可以不用管</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token triple-quoted-string string">&#39;&#39;&#39;\n  注释内容\n&#39;&#39;&#39;</span>\n或者\n\n<span class="token comment"># 注释内容</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2><h3 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符" aria-hidden="true">#</a> 比较运算符</h3><p>以下假设变量 <strong>a=10</strong>，变量 <strong>b=21</strong>：</p><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">描述</th><th style="text-align:left;">实例</th></tr></thead><tbody><tr><td style="text-align:left;">+</td><td style="text-align:left;">加 - 两个对象相加</td><td style="text-align:left;">a + b 输出结果 31</td></tr><tr><td style="text-align:left;">-</td><td style="text-align:left;">减 - 得到负数或是一个数减去另一个数</td><td style="text-align:left;">a - b 输出结果 -11</td></tr><tr><td style="text-align:left;">*</td><td style="text-align:left;">乘 - 两个数相乘或是返回一个被重复若干次的字符串</td><td style="text-align:left;">a * b 输出结果 210</td></tr><tr><td style="text-align:left;">/</td><td style="text-align:left;">除 - x 除以 y</td><td style="text-align:left;">b / a 输出结果 2.1</td></tr><tr><td style="text-align:left;">%</td><td style="text-align:left;">取模 - 返回除法的余数</td><td style="text-align:left;">b % a 输出结果 1</td></tr><tr><td style="text-align:left;">**</td><td style="text-align:left;">幂 - 返回x的y次幂</td><td style="text-align:left;">a**b 为10的21次方</td></tr><tr><td style="text-align:left;">//</td><td style="text-align:left;">取整除 - 向下取接近商的整数</td><td style="text-align:left;">9//2 值是4.5在4和5之间，取小的值,4 -9//2 值是-4.5在-5和-4之间，取小的值，-5</td></tr></tbody></table><h3 id="赋值运算符" tabindex="-1"><a class="header-anchor" href="#赋值运算符" aria-hidden="true">#</a> 赋值运算符</h3><p>以下假设变量a为10，变量b为20：</p><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">描述</th><th style="text-align:left;">实例</th></tr></thead><tbody><tr><td style="text-align:left;">=</td><td style="text-align:left;">简单的赋值运算符</td><td style="text-align:left;">c = a + b 将 a + b 的运算结果赋值为 c</td></tr><tr><td style="text-align:left;">+=</td><td style="text-align:left;">加法赋值运算符</td><td style="text-align:left;">c += a 等效于 c = c + a</td></tr><tr><td style="text-align:left;">-=</td><td style="text-align:left;">减法赋值运算符</td><td style="text-align:left;">c -= a 等效于 c = c - a</td></tr><tr><td style="text-align:left;">*=</td><td style="text-align:left;">乘法赋值运算符</td><td style="text-align:left;">c *= a 等效于 c = c * a</td></tr><tr><td style="text-align:left;">/=</td><td style="text-align:left;">除法赋值运算符</td><td style="text-align:left;">c /= a 等效于 c = c / a</td></tr><tr><td style="text-align:left;">%=</td><td style="text-align:left;">取模赋值运算符</td><td style="text-align:left;">c %= a 等效于 c = c % a</td></tr><tr><td style="text-align:left;">**=</td><td style="text-align:left;">幂赋值运算符</td><td style="text-align:left;">c **= a 等效于 c = c ** a</td></tr><tr><td style="text-align:left;">//=</td><td style="text-align:left;">取整除赋值运算符</td><td style="text-align:left;">c //= a 等效于 c = c // a</td></tr><tr><td style="text-align:left;">:=</td><td style="text-align:left;">海象运算符，可在表达式内部为变量赋值。</td><td style="text-align:left;">猜你们课本太老，肯定不考这个</td></tr></tbody></table><h2 id="逻辑运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符" aria-hidden="true">#</a> 逻辑运算符</h2><p>假设变量 a 为 10, b为 20:</p><p>记住：数值和true,false的对应关系 0为false , 不是0的为true</p><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">逻辑表达式</th><th style="text-align:left;">描述</th><th style="text-align:left;">实例</th></tr></thead><tbody><tr><td style="text-align:left;">and</td><td style="text-align:left;">x and y</td><td style="text-align:left;">布尔&quot;与&quot; - 如果 x 为 false，x and y 返回 x 的值，否则返回 y 的计算值。</td><td style="text-align:left;">(a and b) 返回 20。</td></tr><tr><td style="text-align:left;">or</td><td style="text-align:left;">x or y</td><td style="text-align:left;">布尔&quot;或&quot; - 如果 x 是 True，它返回 x 的值，否则它返回 y 的计算值。</td><td style="text-align:left;">(a or b) 返回 10。</td></tr><tr><td style="text-align:left;">not</td><td style="text-align:left;">not x</td><td style="text-align:left;">布尔&quot;非&quot; - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。</td><td style="text-align:left;">not(a and b) 返回 False</td></tr></tbody></table><h2 id="运算符优先级" tabindex="-1"><a class="header-anchor" href="#运算符优先级" aria-hidden="true">#</a> 运算符优先级</h2><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">**</td><td style="text-align:left;">指数 (最高优先级)</td></tr><tr><td style="text-align:left;">~ + -</td><td style="text-align:left;">按位翻转, 一元加号和减号 (最后两个的方法名为 +@ 和 -@)</td></tr><tr><td style="text-align:left;">* / % //</td><td style="text-align:left;">乘，除，求余数和取整除</td></tr><tr><td style="text-align:left;">+ -</td><td style="text-align:left;">加法减法</td></tr><tr><td style="text-align:left;">&gt;&gt; &lt;&lt;</td><td style="text-align:left;">右移，左移运算符</td></tr><tr><td style="text-align:left;">&amp;</td><td style="text-align:left;">位 &#39;AND&#39;</td></tr><tr><td style="text-align:left;">^ |</td><td style="text-align:left;">位运算符</td></tr><tr><td style="text-align:left;">&lt;= &lt; &gt; &gt;=</td><td style="text-align:left;">比较运算符</td></tr><tr><td style="text-align:left;">== !=</td><td style="text-align:left;">等于运算符</td></tr><tr><td style="text-align:left;">= %= /= //= -= += *= **=</td><td style="text-align:left;">赋值运算符</td></tr><tr><td style="text-align:left;">is is not</td><td style="text-align:left;">身份运算符</td></tr><tr><td style="text-align:left;">in not in</td><td style="text-align:left;">成员运算符</td></tr><tr><td style="text-align:left;">not and or</td><td style="text-align:left;">逻辑运算符</td></tr></tbody></table><h2 id="操作运算符" tabindex="-1"><a class="header-anchor" href="#操作运算符" aria-hidden="true">#</a> 操作运算符</h2><table><thead><tr><th style="text-align:left;">操作符</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;"><code>&lt;</code></td><td style="text-align:left;">小于</td></tr><tr><td style="text-align:left;"><code>&lt;=</code></td><td style="text-align:left;">小于或等于</td></tr><tr><td style="text-align:left;"><code>&gt;</code></td><td style="text-align:left;">大于</td></tr><tr><td style="text-align:left;"><code>&gt;=</code></td><td style="text-align:left;">大于或等于</td></tr><tr><td style="text-align:left;"><code>==</code></td><td style="text-align:left;">等于，比较两个值是否相等</td></tr><tr><td style="text-align:left;"><code>!=</code></td><td style="text-align:left;">不等于</td></tr></tbody></table><h2 id="条件语句" tabindex="-1"><a class="header-anchor" href="#条件语句" aria-hidden="true">#</a> 条件语句</h2><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">if</span> condition_1<span class="token punctuation">:</span>\n    statement_block_1\n<span class="token keyword">elif</span> condition_2<span class="token punctuation">:</span>\n    statement_block_2\n<span class="token keyword">else</span><span class="token punctuation">:</span>\n    statement_block_3\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>如果 &quot;condition_1&quot; 为 True 将执行 &quot;statement_block_1&quot; 块语句</li><li>如果 &quot;condition_1&quot; 为False，将判断 &quot;condition_2&quot;</li><li>如果&quot;condition_2&quot; 为 True 将执行 &quot;statement_block_2&quot; 块语句</li><li>如果 &quot;condition_2&quot; 为False，将执行&quot;statement_block_3&quot;块语句</li></ul>',35),n={},s=(0,l(3744).Z)(n,[["render",function(t,e){return a}]])},3744:(t,e)=>{e.Z=(t,e)=>{const l=t.__vccOpts||t;for(const[t,a]of e)l[t]=a;return l}}}]);