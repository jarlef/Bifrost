﻿#region License
//
// Copyright (c) 2008-2013, Dolittle (http://www.dolittle.com)
//
// Licensed under the MIT License (http://opensource.org/licenses/MIT)
//
// You may not use this file except in compliance with the License.
// You may obtain a copy of the license at 
//
//   http://github.com/dolittle/Bifrost/blob/master/MIT-LICENSE.txt
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
#endregion

namespace Bifrost.CodeGeneration.JavaScript
{
    /// <summary>
    /// Represents a call to a function
    /// </summary>
    public class FunctionCall : LanguageElement
    {
        /// <summary>
        /// Gets or sets the name of the function to call
        /// </summary>
        public string Function { get; set; }

        /// <summary>
        /// Gets or sets the parameters
        /// </summary>
        public LanguageElement[] Parameters { get; set; }

#pragma warning disable 1591
        public override void Write(ICodeWriter writer)
        {
            writer.Write("{0}(", Function);
            if (Parameters != null && Parameters.Length > 0)
            {
                var count = 0;
                foreach (var parameter in Parameters)
                {
                    if (count != 0) writer.Write(", ");

                    parameter.Write(writer);

                    count++;
                }
            }
            writer.Write(")");
        }
#pragma warning restore 1591
    }
}
